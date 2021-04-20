import dimscord, asyncdispatch, times, options, os, parseutils, strutils

let discord = newDiscordClient(getEnv("EGG_BOT_TOKEN"))
var eggs = 0

if fileExists("eggs.txt"):
  discard readFile("eggs.txt").parseInt(eggs)

proc onReady(s: Shard, r: Ready) {.event(discord).} =
  echo "Ready as " & $r.user
  await s.updateStatus(activity = ActivityStatus(
    name: $eggs & " 🥚",
    kind: atPlaying
  ).some, status = "online")

proc messageCreate(s: Shard, m: Message) {.event(discord).} =
  if not m.author.bot and m.content.toLowerAscii.contains("egg"):
    eggs.inc

    try:
      await discord.api.addMessageReaction(m.channelId, m.id, "🥚")
      await s.updateStatus(activity = ActivityStatus(
        name: $eggs & " 🥚",
        kind: atPlaying
      ).some, status = "online")
      writeFile("eggs.txt", $eggs)
    except:
      echo getCurrentExceptionMsg()

waitFor discord.startSession()