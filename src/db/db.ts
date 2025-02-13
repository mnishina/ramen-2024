import type { DB } from "~script/type/";

export const meta = {
  SITE_TITLE: "ラーメン2024",
  SITE_TITLE_EN: "RAMEN2024",
  SITE_SUBTITLE: "2024年に食べたラーメンの記録",
  SITE_DESCRIPTION: {
    P1: "RAMEN2024 is my ramen journal for 2024.<br>I ate 47 bowls of ramen this year.",
    P2: "I visited many ramen shops, from my favorite regular spots to new discoveries.<br>My absolute favorite is 'Tokyo-Style Miso Ramen Do-Miso.'Recently, I've been into what's known as “Chan-style ramen,” such as 'Chie-chan Ramen,' 'Haru-chan Ramen,' and 'Shinbashi New Tomochin.",
  },
  MY_NAME: "M.Nishina",
} as const;

export const noiseImageA: string = "/noiseA.png";
export const noiseImageB: string = "/noiseB.png";

const common = {
  address: {
    lalaport: {
      ja: "&#12306;135-0061<br>東京都江東区豊洲2-4-9",
      en: "2-4-9 Toyosu, Koto-ku,<br>Tokyo 135-0061 Japan.",
    },
    toriton: {
      ja: "&#12306;104-0053<br>東京都中央区晴海1-8-16",
      en: "1-8-16 Harumi, Chuo-ku,<br>Tokyo 104-0053 Japan.",
    },
    ramenYokocho: {
      ja: "&#12306;104-0028<br>東京都中央区八重洲2-1",
      en: "2-1 Yaesu, Chuo-ku,<br>Tokyo 104-0028 Japan.",
    },
    ramenStreet: {
      ja: "&#12306;100-0005<br>東京都千代田区丸の内1-9-1",
      en: "1-9-1 Marunouchi, Chiyoda-ku,<br>Tokyo 100-0005 Japan.",
    },
    ariakeGarden: {
      ja: "&#12306;135-0063<br>東京都江東区有明2-1-8",
      en: "2-1-8 Ariake, Koto-ku,<br>Tokyo 135-0063 Japan.",
    },
    seiya: {
      ja: "&#12306;155-0031<br>東京都世田谷区北沢2-1-8",
      en: "2-1-8 Kitazawa, Setagaya-ku,<br>Tokyo 155-0031 Japan.",
    },
  },
  name: {
    domiso: {
      ja: "東京スタイルみそらーめん<br>ど・みそ",
      en: "Tokyo Style Miso Ramen Do Miso",
      nameLength: "l",
    },
    kimihan: {
      ja: "江戸前中華煮干しそば<br>きみはん",
      en: "Edomae Chuka Niboshi Soba Kimihan",
      nameLength: "l",
    },
    ippudo: {
      ja: "博多一風堂",
      en: "Hakata Ippudo",
      nameLength: "m",
    },
    mitaseimenjo: {
      ja: "三田製麺所",
      en: "Mita Seimenjo",
      nameLength: "m",
    },
    seiya: {
      ja: "らーめん せい家",
      en: "Ramen Seiya",
      nameLength: "s",
    },
    aburadou: {
      ja: "元祖油堂",
      en: "Ganso Aburadou",
      nameLength: "m",
    },
    kamukura: {
      ja: "どうとんぼり 神座",
      en: "Dotonbori Kamukura",
      nameLength: "m",
    },
    naokyu: {
      ja: "麺処 直久",
      en: "Mendokoro Naokyu",
      nameLength: "m",
    },
    machidashouten: {
      ja: "横浜家系ラーメン<br>町田商店",
      en: "Yokohama Iekei Ramen Machida Shoten",
      nameLength: "l",
    },
    fuunji: {
      ja: "風雲児 FUUNJI",
      en: "Fuunji FUUNJI",
      nameLength: "m",
    },
  },
};

export const db: DB[] = [
  {
    date: "2024.01.30",
    name: common.name.domiso.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20240130.avif",
    ramenImage: {
      aspectRatio: "790 / 758",
    },
    enText: {
      name: common.name.domiso.en,
      address: common.address.lalaport.en,
      nameLength: common.name.domiso.nameLength,
    },
  },
  {
    date: "2024.02.03",
    name: "やじ満",
    address: "&#12306;135-0061<br>東京都江東区豊洲6-6-1",
    imagePath: "/20240203.avif",
    ramenImage: {
      aspectRatio: "976 / 732",
    },
    enText: {
      name: "Yajima",
      address: "6-6-1 Toyosu, Koto-ku,<br>Tokyo 135-0061 Japan",
      nameLength: "s",
    },
  },
  {
    date: "2024.02.16",
    name: "長岡食堂",
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240216.avif",
    ramenImage: {
      aspectRatio: "976 / 732",
    },
    enText: {
      name: "Nagaoka Shokudou",
      address: common.address.ramenYokocho.en,
      nameLength: "m",
    },
  },
  {
    date: "2024.03.08",
    name: "長浜屋台 やまちゃん",
    address: "&#12306;104-0061<br>東京都中央区銀座3-11-10",
    imagePath: "/20240308.avif",
    ramenImage: {
      aspectRatio: "976 / 732",
    },
    enText: {
      name: "Nagahame Yatai Yamachan",
      address: "3-11-10 Ginza, Chuo-ku,<br>Tokyo 104-0061 Japan",
      nameLength: "l",
    },
  },
  {
    date: "2024.03.28",
    name: common.name.ippudo.ja,
    address: "&#12306;135-0061<br>東京都江東区豊洲3-2-24",
    imagePath: "/20240328.avif",
    ramenImage: {
      aspectRatio: "604 / 760",
    },
    enText: {
      name: common.name.ippudo.en,
      address: "3-2-24 Toyosu, Koto-ku,<br>Tokyo 135-0061 Japan",
      nameLength: common.name.ippudo.nameLength,
    },
  },
  {
    date: "2024.04.06",
    name: common.name.kimihan.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20240406.avif",
    ramenImage: {
      aspectRatio: "976 / 732",
    },
    enText: {
      name: common.name.kimihan.en,
      address: common.address.lalaport.en,
      nameLength: common.name.kimihan.nameLength,
    },
  },
  {
    date: "2024.04.11",
    name: common.name.machidashouten.ja,
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240411.avif",
    ramenImage: {
      aspectRatio: "511 / 746",
    },
    enText: {
      name: common.name.machidashouten.en,
      address: common.address.ramenYokocho.en,
      nameLength: common.name.machidashouten.nameLength,
    },
  },
  {
    date: "2024.04.17",
    name: common.name.kimihan.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20240417.avif",
    ramenImage: {
      aspectRatio: "976 / 752",
    },
    enText: {
      name: common.name.kimihan.en,
      address: common.address.lalaport.en,
      nameLength: common.name.kimihan.nameLength,
    },
  },
  {
    date: "2024.04.27",
    name: common.name.aburadou.ja,
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240427.avif",
    ramenImage: {
      aspectRatio: "976 / 741",
    },
    enText: {
      name: common.name.aburadou.en,
      address: common.address.ramenYokocho.en,
      nameLength: common.name.aburadou.nameLength,
    },
  },
  {
    date: "2024.05.02",
    name: common.name.aburadou.ja,
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240502.avif",
    ramenImage: {
      aspectRatio: "882 / 735",
    },
    enText: {
      name: common.name.aburadou.en,
      address: common.address.ramenYokocho.en,
      nameLength: common.name.aburadou.nameLength,
    },
  },
  {
    date: "2024.05.05",
    name: "らーめん渡邉",
    address: "&#12306;111-0032<br>東京都台東区浅草1-33-7",
    imagePath: "/20240505.avif",
    ramenImage: {
      aspectRatio: "790 / 754",
    },
    enText: {
      name: "Ramen Watanabe",
      address: "1-33-7 Asakusa, Taito-ku,<br>Tokyo 111-0032 Japan",
      nameLength: "m",
    },
  },
  {
    date: "2024.05.06",
    name: common.name.seiya.ja,
    address: common.address.seiya.ja,
    imagePath: "/20240506.avif",
    ramenImage: {
      aspectRatio: "790 / 764",
    },
    enText: {
      name: common.name.seiya.en,
      address: common.address.seiya.en,
      nameLength: common.name.seiya.nameLength,
    },
  },
  {
    date: "2024.05.10",
    name: common.name.mitaseimenjo.ja,
    address: common.address.toriton.ja,
    imagePath: "/20240510.avif",
    ramenImage: {
      aspectRatio: "1162 / 654",
    },
    enText: {
      name: common.name.mitaseimenjo.en,
      address: common.address.toriton.en,
      nameLength: common.name.mitaseimenjo.nameLength,
    },
  },
  {
    date: "2024.05.14",
    name: common.name.fuunji.ja,
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240514.avif",
    ramenImage: {
      aspectRatio: "1062 / 685",
    },
    enText: {
      name: common.name.fuunji.en,
      address: common.address.ramenYokocho.en,
      nameLength: "s",
    },
  },
  {
    date: "2024.05.20",
    name: common.name.kamukura.ja,
    address: common.address.ariakeGarden.ja,
    imagePath: "/20240520.avif",
    ramenImage: {
      aspectRatio: "976 / 760",
    },
    enText: {
      name: common.name.kamukura.en,
      address: common.address.ariakeGarden.en,
      nameLength: common.name.kamukura.nameLength,
    },
  },
  {
    date: "2024.05.25",
    name: common.name.domiso.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20240525.avif",
    ramenImage: {
      aspectRatio: "882 / 732",
    },
    enText: {
      name: common.name.domiso.en,
      address: common.address.lalaport.en,
      nameLength: common.name.domiso.nameLength,
    },
  },
  {
    date: "2024.05.27",
    name: common.name.seiya.ja,
    address: common.address.seiya.ja,
    imagePath: "/20240527.avif",
    ramenImage: {
      aspectRatio: "1062 / 627",
    },
    enText: {
      name: common.name.seiya.en,
      address: common.address.seiya.en,
      nameLength: common.name.seiya.nameLength,
    },
  },
  {
    date: "2024.06.01",
    name: "東京駅 斑鳩",
    address: common.address.ramenStreet.ja,
    imagePath: "/20240601.avif",
    ramenImage: {
      aspectRatio: "790 / 708",
    },
    enText: {
      name: "Tokyo Station Ikaruga",
      address: common.address.ramenStreet.en,
      nameLength: "m",
    },
  },
  {
    date: "2024.06.08",
    name: common.name.kamukura.ja,
    address: common.address.ariakeGarden.ja,
    imagePath: "/20240608.avif",
    ramenImage: {
      aspectRatio: "976 / 722",
    },
    enText: {
      name: common.name.kamukura.en,
      address: common.address.ariakeGarden.en,
      nameLength: common.name.kamukura.nameLength,
    },
  },
  {
    date: "2024.06.15",
    name: common.name.domiso.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20240615.avif",
    ramenImage: {
      aspectRatio: "604 / 732",
    },
    enText: {
      name: common.name.domiso.en,
      address: common.address.lalaport.en,
      nameLength: common.name.domiso.nameLength,
    },
  },
  {
    date: "2024.06.20",
    name: "松戸富田麺絆",
    address: "&#12306;100-0005<br>東京都千代田区丸の内2-7-2",
    imagePath: "/20240620.avif",
    ramenImage: {
      aspectRatio: "1162 / 654",
    },
    enText: {
      name: "Matsudo Tomita Menban",
      address: "2-7-2 Marunouchi, Chiyoda-ku,<br>Tokyo 100-0005 Japan",
      nameLength: "s",
    },
  },
  {
    date: "2024.07.03",
    name: "らーめん 玉",
    address: common.address.lalaport.ja,
    imagePath: "/20240703.avif",
    ramenImage: {
      aspectRatio: "976 / 750",
    },
    enText: {
      name: "Ramen Gyoku",
      address: common.address.lalaport.en,
      nameLength: "s",
    },
  },
  {
    date: "2024.07.08",
    name: "がっとん",
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240708.avif",
    ramenImage: {
      aspectRatio: "697 / 778",
    },
    enText: {
      name: "Gatton",
      address: common.address.ramenYokocho.en,
      nameLength: "s",
    },
  },
  {
    date: "2024.07.22",
    name: common.name.domiso.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20240722.avif",
    ramenImage: {
      aspectRatio: "696 / 728",
    },
    enText: {
      name: common.name.domiso.en,
      address: common.address.lalaport.en,
      nameLength: common.name.domiso.nameLength,
    },
  },
  {
    date: "2024.07.26",
    name: common.name.naokyu.ja,
    address: common.address.toriton.ja,
    imagePath: "/20240726.avif",
    ramenImage: {
      aspectRatio: "696 / 748",
    },
    enText: {
      name: common.name.naokyu.en,
      address: common.address.toriton.en,
      nameLength: common.name.naokyu.nameLength,
    },
  },
  {
    date: "2024.08.02",
    name: common.name.aburadou.ja,
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240802.avif",
    ramenImage: {
      aspectRatio: "696 / 787",
    },
    enText: {
      name: common.name.aburadou.en,
      address: common.address.ramenYokocho.en,
      nameLength: common.name.aburadou.nameLength,
    },
  },
  {
    date: "2024.08.05",
    name: common.name.naokyu.ja,
    address: common.address.toriton.ja,
    imagePath: "/20240805.avif",
    ramenImage: {
      aspectRatio: "1162 / 608",
    },
    enText: {
      name: common.name.naokyu.en,
      address: common.address.toriton.en,
      nameLength: common.name.naokyu.nameLength,
    },
  },
  {
    date: "2024.08.11",
    name: common.name.naokyu.ja,
    address: common.address.toriton.ja,
    imagePath: "/20240811.avif",
    ramenImage: {
      aspectRatio: "790 / 776",
    },
    enText: {
      name: common.name.naokyu.en,
      address: common.address.toriton.en,
      nameLength: common.name.naokyu.nameLength,
    },
  },
  {
    date: "2024.08.17",
    name: common.name.machidashouten.ja,
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240817.avif",
    ramenImage: {
      aspectRatio: "605 / 744",
    },
    enText: {
      name: common.name.machidashouten.en,
      address: common.address.ramenYokocho.en,
      nameLength: common.name.machidashouten.nameLength,
    },
  },
  {
    date: "2024.09.03",
    name: common.name.fuunji.ja,
    address: common.address.ramenYokocho.ja,
    imagePath: "/20240903.avif",
    ramenImage: {
      aspectRatio: "976 / 728",
    },
    enText: {
      name: common.name.fuunji.en,
      address: common.address.ramenYokocho.en,
      nameLength: "s",
    },
  },
  {
    date: "2024.09.18",
    name: common.name.kimihan.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20240918.avif",
    ramenImage: {
      aspectRatio: "882 / 774",
    },
    enText: {
      name: common.name.kimihan.en,
      address: common.address.lalaport.en,
      nameLength: common.name.kimihan.nameLength,
    },
  },
  {
    date: "2024.09.24",
    name: "博多 だるま",
    address: "&#12306;135-0091<br>東京都港区台場1-7-1",
    imagePath: "/20240924.avif",
    ramenImage: {
      aspectRatio: "790 / 765",
    },
    enText: {
      name: "Hakata Daruma",
      address: "1-7-1 Daiba, Minato-ku,<br>Tokyo 135-0091 Japan",
      nameLength: "s",
    },
  },
  {
    date: "2024.09.27",
    name: "楽楽",
    address: "&#12306;400-0032<br>山梨県甲府市中央1-20-20",
    imagePath: "/20240927.avif",
    ramenImage: {
      aspectRatio: "697 / 798",
    },
    enText: {
      name: "Rakuraku",
      address: "1-20-20 Chuo, Kofu-shi,<br>Yamanashi 400-0032 Japan",
      nameLength: "s",
    },
  },
  {
    date: "2024.10.01",
    name: "えびそば 一幻",
    address: "&#12306;104-0028<br>東京都中央区八重洲2-1",
    imagePath: "/20241001.avif",
    ramenImage: {
      aspectRatio: "790 / 806",
    },
    enText: {
      name: "Ebisoba Ichigen",
      address: "2-1 Yaesu, Chuo-ku,<br>Tokyo 104-0028 Japan",
      nameLength: "m",
    },
  },
  {
    date: "2024.10.16",
    name: common.name.domiso.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20241016.avif",
    ramenImage: {
      aspectRatio: "604 / 780",
    },
    enText: {
      name: common.name.domiso.en,
      address: common.address.lalaport.en,
      nameLength: common.name.domiso.nameLength,
    },
  },
  {
    date: "2024.10.22",
    name: "久留米ラーメン 金丸",
    address: "&#12306;104-0061<br>東京都中央区銀座1-13-9",
    imagePath: "/20241022.avif",
    ramenImage: {
      aspectRatio: "976 / 689",
    },
    enText: {
      name: "Kurume Ramen Kinmaru",
      address: "1-13-9 Ginza, Chuo-ku,<br>Tokyo 104-0061 Japan",
      nameLength: "long",
    },
  },
  {
    date: "2024.10.27",
    name: "すみれ",
    address: "&#12306;231-0064<br>神奈川県横浜市中区野毛町1-26-5",
    imagePath: "/20241027.avif",
    ramenImage: {
      aspectRatio: "882 / 726",
    },
    enText: {
      name: "Sumire",
      address: "1-26-5 Nogecho, Naka-ku, Yokohama,<br>Kanagawa 231-0064 Japan",
      nameLength: "s",
    },
  },
  {
    date: "2024.11.08",
    name: common.name.domiso.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20241108.avif",
    ramenImage: {
      aspectRatio: "976 / 722",
    },
    enText: {
      name: common.name.domiso.en,
      address: common.address.lalaport.en,
      nameLength: common.name.domiso.nameLength,
    },
  },
  {
    date: "2024.11.16",
    name: common.name.ippudo.ja,
    address: "&#12306;135-0061<br>東京都江東区豊洲3-2-24",
    imagePath: "/20241116.avif",
    ramenImage: {
      aspectRatio: "1068 / 740",
    },
    enText: {
      name: common.name.ippudo.en,
      address: "3-2-24 Toyosu, Koto-ku,<br>Tokyo 135-0061 Japan",
      nameLength: common.name.ippudo.nameLength,
    },
  },
  {
    date: "2024.11.22",
    name: common.name.mitaseimenjo.ja,
    address: common.address.toriton.ja,
    imagePath: "/20241122.avif",
    ramenImage: {
      aspectRatio: "976 / 732",
    },
    enText: {
      name: common.name.mitaseimenjo.en,
      address: common.address.toriton.en,
      nameLength: common.name.mitaseimenjo.nameLength,
    },
  },
  {
    date: "2024.12.02",
    name: common.name.kamukura.ja,
    address: "&#12306;100-0005<br>東京都千代田区丸の内1-9-1",
    imagePath: "/20241202.avif",
    ramenImage: {
      aspectRatio: "976 / 736",
    },
    enText: {
      name: common.name.kamukura.en,
      address: "1-9-1 Marunouchi, Chiyoda-ku,<br>Tokyo 100-0005 Japan",
      nameLength: common.name.kamukura.nameLength,
    },
  },
  {
    date: "2024.12.07",
    name: "ちえちゃんラーメン",
    address: "&#12306;101-0044<br>東京都千代田区鍛冶町2-13-7",
    imagePath: "/20241207.avif",
    ramenImage: {
      aspectRatio: "882 / 761",
    },
    enText: {
      name: "Chiechan Ramen",
      address: "2-13-7 Kajicho, Chiyoda-ku,<br>Tokyo 101-0044 Japan",
      nameLength: "m",
    },
  },
  {
    date: "2024.12.08",
    name: "はるちゃんラーメン",
    address: "&#12306;104-0061<br>東京都中央区銀座3-11-6",
    imagePath: "/20241208.avif",
    ramenImage: {
      aspectRatio: "976 / 748",
    },
    enText: {
      name: "Haruchan Ramen",
      address: "3-11-6 Ginza, Chuo-ku,<br>Tokyo 104-0061 Japan",
      nameLength: "m",
    },
  },
  {
    date: "2024.12.13",
    name: common.name.mitaseimenjo.ja,
    address: common.address.toriton.ja,
    imagePath: "/20241213.avif",
    ramenImage: {
      aspectRatio: "1162 / 684",
    },
    enText: {
      name: common.name.mitaseimenjo.en,
      address: common.address.toriton.en,
      nameLength: common.name.mitaseimenjo.nameLength,
    },
  },
  {
    date: "2024.12.24",
    name: common.name.domiso.ja,
    address: common.address.lalaport.ja,
    imagePath: "/20241224.avif",
    ramenImage: {
      aspectRatio: "605 / 758",
    },
    enText: {
      name: common.name.domiso.en,
      address: common.address.lalaport.en,
      nameLength: common.name.domiso.nameLength,
    },
  },
  {
    date: "2024.12.30",
    name: "新橋 ニューともちん",
    address: "&#12306;101-0051<br>東京都千代田区神田神保町1-12",
    imagePath: "/20241230.avif",
    ramenImage: {
      aspectRatio: "1068 / 712",
    },
    enText: {
      name: "Shinbashi New Tomochin",
      address: "1-12 Kanda-Jimbocho, Chiyoda-ku,<br>Tokyo 101-0051 Japan",
      nameLength: "long",
    },
  },
];
