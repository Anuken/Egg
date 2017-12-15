package io.anuke.egg;

import com.vdurmont.emoji.EmojiManager;

import io.anuke.ucore.util.Mathf;
import sx.blah.discord.api.ClientBuilder;
import sx.blah.discord.api.IDiscordClient;
import sx.blah.discord.api.events.EventDispatcher;
import sx.blah.discord.api.events.EventSubscriber;
import sx.blah.discord.handle.impl.events.guild.channel.message.MessageReceivedEvent;
import sx.blah.discord.handle.obj.IMessage;

public class EggBot{
	String token;
	IDiscordClient client;
	
	double eggChance = 1.0 / 900.0;
	
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
	public void onMessageReceivedEvent(MessageReceivedEvent event){
		IMessage m = event.getMessage();
		if(m.getContent().toLowerCase().contains("egg")){
			m.addReaction(EmojiManager.getForAlias("egg"));
			System.out.println("Egged.");
		}else{
			if(Mathf.chance(eggChance)){
				m.getChannel().sendMessage("egg");
				System.out.println("Rare egg.");
			}
		}
	}
	
	public static void main(String[] args){
		new EggBot();
	}
}
