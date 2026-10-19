export type Omen = {
  id: string;
  dish: string;
  image: string;
  title: string;
  spell: string;
  whisper: string;
  warmth: string;
  miracle: string;
};

export const OMENS: Omen[] = [
  {
    id: "big-mac",
    dish: "巨无霸",
    image: "burger",
    title: "三层都算数",
    spell: "层叠皆安",
    whisper: "今日的征兆是叠着的。没有一层是多余的，也没有一层该先被扔掉。",
    warmth:
      "你最近是不是把好几段人生压在同一口呼吸里。巨无霸不是催你一次吃完所有身份。它只是说：面包、肉、生菜可以同时在，不必先道歉。今天允许自己占三层的位置。饿了就吃，不要边吃边解释自己为什么饿。",
    miracle: "这一顿把手机扣过去，只扣这一顿。",
  },
  {
    id: "double-cheese",
    dish: "双层吉士汉堡",
    image: "burger",
    title: "芝士还没断",
    spell: "热处可依",
    whisper: "有一层还在慢慢化。它不赶时间，你也不必。",
    warmth:
      "如果今天有人要你马上给答案，先给自己一口热的。双层吉士不是奖励，是一个很短的停靠：外面的事还在，里面可以先软下来。你不需要变得更有效率，才配得上这口热的。",
    miracle: "点单时把「不要酸黄瓜」或你真正想改的那一项，说完整。",
  },
  {
    id: "spicy",
    dish: "麦辣鸡腿堡",
    image: "spicy",
    title: "辣是一种清醒",
    spell: "辣处有光",
    whisper: "暗里有一点红。它不伤人，只是把麻木叫醒。",
    warmth:
      "今天适合把那件你一直用「还好」盖住的事，轻轻叫出名字。麦辣不是惩罚，是一种清楚。辣完会微微喘气，然后世界的轮廓回来了。如果你本来就累，就小口吃，不必表演自己能吃辣。",
    miracle: "吃到最辣的那口时停两秒，把肩膀从耳朵旁边放下来。",
  },
  {
    id: "nuggets",
    dish: "麦乐鸡（五块）",
    image: "nuggets",
    title: "可以分成五次",
    spell: "块块皆可",
    whisper: "大事不肯来。今日只来五块，一块一块地热。",
    warmth:
      "你不必今天把整件事做完。五块麦乐鸡是一种礼貌的拆法：每一块都完整，合在一起也完整。酱可以只蘸一块，剩下的原味也算数。有人来分的话，留两块给自己，这不是小气。",
    miracle: "把今天要做的事写成五件很小的。做完一件，就允许自己停一下。",
  },
  {
    id: "fries",
    dish: "大薯",
    image: "fries",
    title: "盐粒还热",
    spell: "金盐未凉",
    whisper: "一条细而直的光。它不指向远方，只指向还烫的那一口。",
    warmth:
      "今天不必做对所有选择。你只要在饿的时候，认真吃完一份大薯。盐会先醒，然后是你。有人伸手来拿，分一半就好，剩下的留给那个还没被安慰到的自己。不要边走边吃完，找一张能坐下的地方。",
    miracle: "拿一张干净纸巾，把第一根放慢到能听见脆声。",
  },
  {
    id: "fries-mid",
    dish: "中薯",
    image: "fries",
    title: "刚好一手",
    spell: "一手刚好",
    whisper: "不是越大越灵。今日的运气只有一手那么宽。",
    warmth:
      "你已经习惯把份量点大，好像多一点就安全一点。今天的签说：一手握得住的，才吃得完，也才温暖得到底。中薯不是委屈，是刚好。吃完如果还想要，再加不迟；先相信这一手是够的。",
    miracle: "点中薯，不要改成大的。把「够了」说给自己听一次。",
  },
  {
    id: "apple",
    dish: "苹果派",
    image: "pie",
    title: "心里有一格热",
    spell: "芯热未散",
    whisper: "外壳是安静的。真正的话，在咬开之后。",
    warmth:
      "苹果派适合那种表面还撑得住、里面已经凉了很久的日子。你不用告诉任何人为什么突然想吃甜的。馅会轻轻烫一下舌头，那一下只是提醒：你还在，而且你值得一件小小的、刚刚出炉的事。",
    miracle: "吃派的时候不看消息。让它凉到刚好，再咬第二口。",
  },
  {
    id: "pineapple",
    dish: "菠萝派",
    image: "pie",
    title: "酸也是一种甜",
    spell: "酸甜同在",
    whisper: "今日的签不是纯甜。它带一点亮的酸，免得你被哄着睡。",
    warmth:
      "有些安慰太甜，吃完更空。菠萝派把酸留在里面，是为了让你吃完还能走路。今天如果有人只给你好听的话，你可以要一句真的。你对自己，也先说一句真的，然后再吃这个派。",
    miracle: "把派从中间掰开，看一眼馅，再合上吃。像读一封很短的信。",
  },
  {
    id: "cone",
    dish: "圆筒冰淇淋",
    image: "cone",
    title: "来得及化掉",
    spell: "慢化亦甜",
    whisper: "它正在离开原来的形状。这不是失败，是它本来的时钟。",
    warmth:
      "今天有一件事会自己过去，你不用追着把它冻住。圆筒要你在它还是它的时候吃完：不拍照存证，不留到回家。甜是短暂的，短暂不等于不值钱。滴到手上就舔掉，不必觉得丢脸。",
    miracle: "找一段不用赶路的路，走着把它吃完。",
  },
  {
    id: "coffee",
    dish: "鲜萃咖啡",
    image: "coffee",
    title: "热气先到",
    spell: "雾起人醒",
    whisper: "人还没坐稳，气味已经把这一天认出来了。",
    warmth:
      "如果脑子很吵，不要再灌进去更多计划。一杯黑咖啡只做一件事：把温度送到手里。苦是干净的，不是对你的评价。你可以加糖，那不叫认输。喝到一半如果还是累，就承认累，咖啡不会因此失望。",
    miracle: "第一口之前先闻三秒，让鼻子比嘴巴先歇下来。",
  },
  {
    id: "latte",
    dish: "拿铁",
    image: "coffee",
    title: "奶盖住一点苦",
    spell: "苦中有乳",
    whisper: "不是所有清醒都要硬。今日允许把棱角调柔。",
    warmth:
      "你已经很会硬撑了。拿铁是给那种「我可以，但我不想再表演可以」的早晨或深夜。牛奶不取消咖啡，它只是陪着。今天说话可以慢半拍，回复可以短一点。你依然可靠，只是可靠不必烫嘴。",
    miracle: "用双手捧着杯子，直到掌心热起来再放下。",
  },
  {
    id: "sausage-muffin",
    dish: "猪柳蛋麦满分",
    image: "breakfast",
    title: "天还没完全亮",
    spell: "晨蛋未破",
    whisper: "有一顿饭站在夜里和白天的缝上，专门等你。",
    warmth:
      "如果你醒得很早，或根本没睡好，这一个麦满分不盘问你。蛋是软的，饼是烫的，这就是全部的道理。今天的第一句话可以只对柜台说。其余的人，等你吃完再见面也不迟。",
    miracle: "先吃到蛋黄的那一口，别留到最后凉掉。",
  },
  {
    id: "cheese-muffin",
    dish: "吉士蛋麦满分",
    image: "breakfast",
    title: "早晨可以很轻",
    spell: "轻食亦稳",
    whisper: "少，不等于不够。这一版没有大声，也把你托住了。",
    warmth:
      "今天不适合一上来就很重。吉士和蛋是一种轻的依靠：热、咸、软，刚刚好让胃知道日子开始了，又不会把你压回枕头里。如果你在愧疚自己起不来，吃完这一个再决定要不要愧疚。",
    miracle: "吃饭时把肩膀放下来，只放一次也算。",
  },
  {
    id: "tea",
    dish: "柠檬红茶",
    image: "tea",
    title: "冰也能醒",
    spell: "冰下有茶",
    whisper: "表面是凉的。底下那一口，仍旧是被泡开的叶子。",
    warmth:
      "不是每个需要被安慰的时刻都要热食。有时你只是闷，柠檬的酸会把闷掀开一条缝。红茶还在，所以你不会空。话很多，就先喝一口再接；话很少，这杯可以当你的旁白，不必解释。",
    miracle: "含着一口冰茶，看向窗外或天花板十秒，再咽下去。",
  },
  {
    id: "crispy",
    dish: "麦麦脆汁鸡",
    image: "crispy",
    title: "壳是来保护的",
    spell: "脆壳守心",
    whisper: "外面一声轻响，里面还是热的。顺序不要反。",
    warmth:
      "你给自己包了太多层「没事」。这层壳不一样：它脆，是为了把热留住，不是为了把人挡在外面。今天可以硬一点面对事情，但吃的时候用牙齿，不要用脾气。手指上的咸，洗掉再去开下一场。",
    miracle: "挑最脆的一块，先安静吃完，再看手机。",
  },
  {
    id: "fish",
    dish: "深海鳟鱼堡",
    image: "fish",
    title: "今天走软的那条",
    spell: "深海里白",
    whisper: "不是所有签都要金黄发亮。有一种运气是白的、软的、不争。",
    warmth:
      "如果这两天你已经够冲了，就换一条不较劲的路。鱼肉容易散，所以要轻一点咬。今天的决定也可以轻，不必每个都像宣言。那一点酸是为了让软的东西还站得住，不是为了刺你。",
    miracle: "点这一个的时候，不要再加一份「以防万一」的炸物。",
  },
  {
    id: "grilled",
    dish: "板烧鸡腿堡",
    image: "burger",
    title: "火还留着",
    spell: "炭香未散",
    whisper: "不是炸出来的响。是慢慢烤过的那种安静。",
    warmth:
      "板烧鸡腿堡适合你已经吵够了的日子。肉是软的，酱是甜的，甜不是讨好，是收尾。今天说话可以短，决定可以慢。你不需要再用辣来证明自己还醒着。",
    miracle: "点的时候把酱留在上面，不要刮掉。",
  },
  {
    id: "mcchicken",
    dish: "麦香鸡",
    image: "burger",
    title: "经典还在岗",
    spell: "酥里有软",
    whisper: "有些东西不上头条，但每天都把人接住。",
    warmth:
      "麦香鸡不是惊喜，是你认识了很多年的那一种稳。今天如果新东西让你累，就回到这个。鸡是热的，生菜是脆的，你不用为「又点了一样的」道歉。",
    miracle: "走路之前先吃掉最外面那层脆皮。",
  },
  {
    id: "cheeseburger",
    dish: "吉士汉堡包",
    image: "burger",
    title: "小也可以算",
    spell: "一小口热",
    whisper: "今日的签不宽。它刚刚好盖住掌心。",
    warmth:
      "你老觉得要大的才值得停下来。吉士汉堡包说：停三十秒也算吃饭。芝士还在，肉还在，你还在。吃完如果还饿，再加不迟；先让这一小口被认真吃完。",
    miracle: "不要边回消息边吃完它。",
  },
  {
    id: "hamburger",
    dish: "汉堡包",
    image: "burger",
    title: "没有多加一层",
    spell: "原样也好",
    whisper: "今日不加成，不叠加，也不解释。",
    warmth:
      "汉堡包几乎什么都没多给你。这正是签的意思：今天可以不做加法。原味、热、咸，够把胃安顿好。你不必用升级来证明自己值得被好好对待。",
    miracle: "点最小的那一个，看自己会不会慌。",
  },
  {
    id: "double-grilled",
    dish: "双层板烧鸡腿堡",
    image: "burger",
    title: "可以要厚的",
    spell: "两层都软",
    whisper: "今日不是单薄的安慰。它叠了两次。",
    warmth:
      "如果你觉得一份照顾不够，双层板烧是被允许的加厚。不是因为你贪，是因为你空得比较深。酱会甜，鸡会软，吃的时候慢，免得甜把你淹住。",
    miracle: "中间那一口放慢，确认自己真的吃到了两层。",
  },
  {
    id: "big-fillet",
    dish: "那么大鸡排",
    image: "crispy",
    title: "今天可以占地方",
    spell: "大也轻轻",
    whisper: "它摊开，比你预想的宽。不是为了吓你。",
    warmth:
      "那么大鸡排是一种被允许的夸张。你最近是不是把自己缩得很小。今天这一份可以大，可以咸，可以在手上占满。大不等于贪。吃不完就分走，但先承认你想要大的。",
    miracle: "先撕下一角，确认里面是热的，再决定怎么吃。",
  },
  {
    id: "wings",
    dish: "麦辣鸡翅",
    image: "spicy",
    title: "辣停在边缘",
    spell: "翅尖醒人",
    whisper: "不是整个人被点着。只是翅尖那一点红。",
    warmth:
      "麦辣鸡翅适合你只想清醒一点点、不想掀桌的时候。吃完手会咸，这是证据：你确实停下来吃过东西。舔完手指再去洗手，不必假装自己很体面。",
    miracle: "吃完用湿纸巾慢慢擦，当成分界线。",
  },
  {
    id: "nuggets-10",
    dish: "麦乐鸡（十块）",
    image: "nuggets",
    title: "可以再多五次",
    spell: "十次都算",
    whisper: "五块已经够礼貌。今日允许你要满的那一盒。",
    warmth:
      "十块不是贪心，是你今天的任务确实比较碎。一块对一件小事。可以不蘸酱，也可以只蘸三块。剩下的原味，是你还想自己拿主意的部分。",
    miracle: "分给别人之前，先把自己那一份数清楚。",
  },
  {
    id: "nuggets-20",
    dish: "麦乐鸡（二十块）",
    image: "nuggets",
    title: "今天人多",
    spell: "够分亦留",
    whisper: "盒子很满。满不是催你全部负责。",
    warmth:
      "二十块是一桌人的份，也可以是你一个人想要很满的一天。分的时候数一数，不要把自己分到只剩骨头气。你先留四块，这是规矩，不是自私。",
    miracle: "自己的四块先吃掉一块，再把盒子推向桌子中间。",
  },
  {
    id: "crispy-plain",
    dish: "原味脆汁鸡",
    image: "crispy",
    title: "可以不刺激",
    spell: "不辣也脆",
    whisper: "壳还在响。响的下面没有火。",
    warmth:
      "不是所有清醒都要靠辣。原味脆汁鸡把热留在肉里，皮负责出声。今天如果你已经被人刺激够了，就点不辣的。脆是高兴，不是挑衅。",
    miracle: "先吃皮，再吃肉，不要一次咬穿。",
  },
  {
    id: "fries-small",
    dish: "小薯",
    image: "fries",
    title: "一小袋也热",
    spell: "少亦成餐",
    whisper: "袋子很轻。轻不是敷衍。",
    warmth:
      "小薯是给那种「我其实不饿，可是心里空」的时刻。你不需要为了一点点空，就点一整份大的把自己撑住。吃完如果还空，那是心情，不是土豆的错。",
    miracle: "全部吃完，不要留三根在袋底过夜。",
  },
  {
    id: "corn",
    dish: "玉米杯",
    image: "corn",
    title: "今天甜得正当",
    spell: "甜在杯里",
    whisper: "不是甜点。是一颗一颗站好的甜。",
    warmth:
      "玉米杯适合你嘴上说不需要被照顾、身体却在要一点甜的时候。它热，它简单，它不会问你为什么。用勺子，一颗一颗，不要倒进嘴里赶路。",
    miracle: "吃到见底，看杯子空了，就算这一小件事做完了。",
  },
  {
    id: "hashbrown",
    dish: "脆薯饼",
    image: "breakfast",
    title: "早晨的一块",
    spell: "边脆心软",
    whisper: "圆的，扁的，热的。它不发表演讲。",
    warmth:
      "脆薯饼是早餐里最老实的那一块。外面响，里面是土豆。今天如果脑子已经很满，就不要再点一个很复杂的。这一块加一杯热的，日子就可以开始。",
    miracle: "趁脆的时候先咬边，中间留到最后。",
  },
  {
    id: "sausage-plain",
    dish: "猪柳麦满分",
    image: "breakfast",
    title: "可以不要那层蛋",
    spell: "无蛋亦晨",
    whisper: "少了一层，早晨还是早晨。",
    warmth:
      "不是每个早晨都需要被蛋黄照顾。猪柳麦满分把饼和肉留给你，干净，咸，热。今天如果你不想被「应该更丰盛」绑架，就点这个。少，是你选的，不是你被亏待。",
    miracle: "第一口饼，第二口肉，不要混成看不出层次。",
  },
  {
    id: "ham-cheese",
    dish: "芝芝火腿扒堡",
    image: "breakfast",
    title: "有一根线没断",
    spell: "芝士还牵",
    whisper: "拉开的时候，还有东西跟着你。",
    warmth:
      "芝芝火腿扒堡是给那种快要断开、又还没完全断开的早晨。芝士拉丝不是浪漫，是「还连着」。今天你可以慢一点离开被窝，慢一点把自己交给一整天。",
    miracle: "拉开看一眼那根丝，再咬断。不要拍。",
  },
  {
    id: "cola",
    dish: "可口可乐",
    image: "soda",
    title: "先响一声",
    spell: "气泡先语",
    whisper: "杯子还没送到嘴边，气已经在说话。",
    warmth:
      "有时候你需要的不是一顿，是一口气。可乐的气泡会顶一下鼻腔，像把闷着的话挤开。今天如果吃不下固体，就先喝这个，冰的，满的。糖是真的，困也是真的。",
    miracle: "含一口，让气泡停两秒，再咽。",
  },
  {
    id: "cola-zero",
    dish: "无糖可口可乐",
    image: "soda",
    title: "甜退了，醒还在",
    spell: "气仍未散",
    whisper: "少了糖，气泡没有离职。",
    warmth:
      "无糖可乐是给那种想被叫醒、又不想再摄入更多甜的人。气泡还在，喉咙还是会麻一下。这不是将就，是你在选择一种更干净的醒。醒了就够。",
    miracle: "喝半杯就停一下，看自己是渴，还是只是想有个杯子握着。",
  },
  {
    id: "sprite",
    dish: "雪碧",
    image: "soda",
    title: "清一下",
    spell: "柠檬色醒",
    whisper: "没有那么甜的负担。今天要的是透。",
    warmth:
      "雪碧适合话太多、脑子起雾的下午。冰，酸，气泡，把舌头叫醒。你不用靠它解决任何事。它只负责让你在下一句话之前，先清醒半分钟。",
    miracle: "喝完之前不要再加一杯咖啡。",
  },
  {
    id: "sundae-choc",
    dish: "朱古力新地",
    image: "cone",
    title: "甜在最上面",
    spell: "顶上先化",
    whisper: "巧克力先软下来，下面还是凉的。",
    warmth:
      "朱古力新地是一种从上往下的安慰。你不需要挖得很深才碰到甜。今天如果只能接受一点点好，就先吃顶上那层。不要等它变成一碗棕汤才肯开始。",
    miracle: "用勺子，不要用吸管把它吸完。",
  },
  {
    id: "sundae-berry",
    dish: "草莓新地",
    image: "cone",
    title: "可以幼稚一点",
    spell: "粉是轻轻",
    whisper: "今日的签是粉色的。它不为此羞愧。",
    warmth:
      "你是不是很久没有为了一个单纯的甜停下来。草莓新地不提供人生建议。它冷，它粉，果酱里有一点酸。今天允许自己点一个看起来不那么「成熟」的东西。",
    miracle: "吃的时候不要解释「我只是随便点的」。",
  },
  {
    id: "mcflurry-oreo",
    dish: "奥利奥麦旋风",
    image: "cone",
    title: "碎也拌得匀",
    spell: "碎在甜里",
    whisper: "饼干已经碎了。碎完还在同一杯里。",
    warmth:
      "奥利奥麦旋风是给碎掉的一天。事情裂开了，但还被搅拌在一起，甜还在，黑色的屑也在。你不用今天把碎片拼回原状。两种味道都算这一杯。",
    miracle: "吃到最后，把杯壁刮干净。",
  },
  {
    id: "mcflurry-berry",
    dish: "草莓麦旋风",
    image: "cone",
    title: "酸甜转了一圈",
    spell: "果在风里",
    whisper: "红的碎屑已经混进白的里面。分不开了。",
    warmth:
      "草莓麦旋风适合心情混在一起的日子：开心和委屈在同一杯。你不用今天把它们分开分析。勺子转一圈，两种味道都上来，就让它们一起被吃掉。",
    miracle: "不要边吃边比较哪个味道更多。",
  },
  {
    id: "americano",
    dish: "美式咖啡",
    image: "coffee",
    title: "不加掩饰",
    spell: "直苦也安",
    whisper: "没有奶来圆场。今日的清醒是直的。",
    warmth:
      "美式适合你已经知道答案、只是还不敢承认的时候。苦不会替你决定，它只是不哄你。可以小口，可以在旁边放一杯水。今天少说一句场面话。",
    miracle: "喝完之前，把那件拖着的小事做掉一件。",
  },
  {
    id: "cocoa",
    dish: "热朱古力",
    image: "coffee",
    title: "甜也可以热",
    spell: "杯壁先暖",
    whisper: "不是冰的奖赏。是双手先被握住。",
    warmth:
      "热朱古力给那种冷从骨头里来的晚上或清早。巧克力是浓的，浓不是腻，是它不肯淡。你如果不好意思点这么甜的热饮，就当作是在取暖。",
    miracle: "两只手一起捧，喝三口再看屏幕。",
  },
  {
    id: "cappuccino",
    dish: "卡布奇诺",
    image: "coffee",
    title: "上面那层软",
    spell: "奶泡先吻",
    whisper: "苦在底下等着。你可以先停在软的地方。",
    warmth:
      "卡布奇诺是分层的许可。你不必一口就到底。奶泡会沾到嘴唇，擦掉就好。今天做事也可以先做软的那一层：回一个容易的消息，然后再决定要不要碰底下的苦。",
    miracle: "喝之前看一眼奶泡，让它还是它。",
  },
];

export function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function dayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function omenForDay(day: string) {
  return OMENS[hashString(`jinhong:${day}`) % OMENS.length];
}

export function drawOmen(excludeId?: string) {
  const pool = excludeId ? OMENS.filter((omen) => omen.id !== excludeId) : OMENS;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index] ?? OMENS[0];
}

export function omenById(id: string) {
  return OMENS.find((omen) => omen.id === id) ?? null;
}

export function formatDay(day: string) {
  const [y, m, d] = day.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}
