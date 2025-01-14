const Command = require("../../structures/Command");
const Canvacord = require("canvacord");
const discord = require("discord.js");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "jail",
      description: "Send Someone to jail!",
      category: "Images",
      cooldown: 5,
    });
  }

  async run(message, args) {
    const client = message.client;
    let user =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      match(args.join(" ").toLowerCase(), message.guild) ||
      message.author;

    let avatar = user.displayAvatarURL({ dynamic: true, format: "png" });
    let image = await Canvacord.Canvas.jail(avatar);
    let attachment = new discord.MessageAttachment(image, "jail.png");
    message.channel.sendCustom(attachment);

    function match(msg, i) {
      if (!msg) return undefined;
      if (!i) return undefined;
      let user = i.members.cache.find(
        (m) =>
          m.user.username.toLowerCase().startsWith(msg) ||
          m.user.username.toLowerCase() === msg ||
          m.user.username.toLowerCase().includes(msg) ||
          m.displayName.toLowerCase().startsWith(msg) ||
          m.displayName.toLowerCase() === msg ||
          m.displayName.toLowerCase().includes(msg)
      );
      if (!user) return undefined;
      return user.user;
    }
  }
};
