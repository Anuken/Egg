package io.anuke.egg;

import com.vdurmont.emoji.EmojiManager;

import sx.blah.discord.api.ClientBuilder;
import sx.blah.discord.api.IDiscordClient;
import sx.blah.discord.api.events.EventDispatcher;
import sx.blah.discord.api.events.EventSubscriber;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;
import sx.blah.discord.handle.impl.events.shard.ShardReadyEvent;
import sx.blah.discord.handle.obj.IGuild;
import sx.blah.discord.handle.obj.IMessage;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class EggBot{
	String token;
	IDiscordClient client;
	
	double eggChance = 1.0 / 700.0;
	List<String> channels = Arrays.asList("social", "general");
	List<String> limitedServers = Arrays.asList("Mindustry");
	
	public EggBot(){
		token = System.getProperty("token");
		System.out.println(token);
		
		ClientBuilder clientBuilder = new ClientBuilder();
		clientBuilder.withToken(token);

		client = clientBuilder.login();

		EventDispatcher event = client.getDispatcher();
		event.registerListener(this);

		System.out.println("Discord bot up.");
	}

	@EventSubscriber
	public void onShardReady(ShardReadyEvent event){
		System.out.println("Egging in many servers: " + client.getGuilds().stream().map(IGuild::getName).collect(Collectors.toList()));
	}
	
	@EventSubscriber
	public void onMessageReceivedEvent(MessageReceivedEvent event){
		IMessage m = event.getMessage();
		if(Normalizer.normalize(m.getContent().toLowerCase(), Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").contains("egg")){
			m.addReaction(EmojiManager.getForAlias("egg"));
			System.out.println("Egged.");
		}else{
			if((!limitedServers.contains(m.getGuild().getName()) || channels.contains(m.getChannel().getName())) && Math.random() < eggChance){
				m.getChannel().sendMessage("egg");
				System.out.println("Rare egg.");
			}
		}
	}
	
	public static void main(String[] args){
		new EggBot();
	}
}
