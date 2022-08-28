const avatarImages = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F05%2F20171231191240.gif&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635170571&t=66f63e1883cc38e91907f3c6fb7327a3',
];

export const getRandomIntInclusive = (min, max) => {
  (min = Math.ceil(min)), (max = Math.floor(max));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomAvatar = () => {
  const index = getRandomIntInclusive(0, avatarImages.length - 1);
  return avatarImages[index];
};
