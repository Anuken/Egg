import net.dv8tion.jda.api.*;
import net.dv8tion.jda.api.events.message.*;
import net.dv8tion.jda.api.hooks.*;
import net.dv8tion.jda.api.requests.*;

import java.text.*;
import java.util.*;

public class Egg extends ListenerAdapter{

    public static void main(String[] args) throws Exception{
        JDABuilder.create(System.getProperty("token"), Arrays.asList(GatewayIntent.GUILD_MESSAGES)).addEventListeners(new Egg()).build();
    }

    @Override
    public void onMessageReceived(MessageReceivedEvent event){
        if(Normalizer.normalize(event.getMessage().getContentRaw().toLowerCase(), Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "").contains("egg")){
            event.getMessage().addReaction("\uD83E\uDD5A").queue();
        }

        if(Math.random() < 1.0 / 7000.0){
            event.getChannel().sendMessage("egg").queue();
        }
    }
}
