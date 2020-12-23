var ALL_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var ALL_DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море',
  'Как же круто тут кормят', 'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];
var PICTURES_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
var PICTURES = document.querySelector('.pictures');

var getRandomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomIndex = function(maxLength) {
  return Math.floor(Math.random() * Math.floor(maxLength));
};

var getComments = function(commentsArr) {
  if (Math.random() > 0.5) {
    var randomComment = [`${commentsArr[getRandomIndex(commentsArr.length)]}`];
  } else {
    var firstComment = getRandomIndex(commentsArr.length - 1);
    var randomComment = [`${commentsArr[firstComment]}`, `${commentsArr[firstComment + 1]}`];
  }

  return randomComment;
}

var photoDescribeObjects = [];

var getPhotoDescribeObjects = function() {
  for (var i = 1; i <= 25; i++) {
    var photoDescribeObjectTemp = {
      url: `../img/photos/${i}.jpg`,
      likes: getRandomInt(15, 200),
      comments: getComments(ALL_COMMENTS),
      description: ALL_DESCRIPTION[getRandomIndex(ALL_DESCRIPTION.length)]
    };

    photoDescribeObjects.push(photoDescribeObjectTemp);
  };

  return photoDescribeObjects;
};

getPhotoDescribeObjects();

var renderPhotos = function(photoDescribeObjects) {
  var pictureClone = PICTURES_TEMPLATE.cloneNode('true');
  pictureClone.querySelector('.picture__img').src = photoDescribeObjects.url;
  pictureClone.querySelector('.picture__comments').textContent = photoDescribeObjects.comments.length;
  pictureClone.querySelector('.picture__likes').textContent = photoDescribeObjects.likes;
  return pictureClone;
};

var photoFragment = document.createDocumentFragment();
for (var i = 0; i < photoDescribeObjects.length; i++) {
  photoFragment.appendChild(renderPhotos(photoDescribeObjects[i]));
};

PICTURES.appendChild(photoFragment);

var COMMENT_TEMPLATE = document.querySelector('#comment').content.querySelector('.social__comment');
var COMMENTS = document.querySelector('.social__comments');
var BIG_PICTURE = document.querySelector('.big-picture');


BIG_PICTURE.classList.remove('hidden');
BIG_PICTURE.querySelector('.big-picture__img img').src = photoDescribeObjects[0].url;
BIG_PICTURE.querySelector('.likes-count').textContent = photoDescribeObjects[0].likes;
BIG_PICTURE.querySelector('.comments-count').textContent = photoDescribeObjects[0].comments.length;
BIG_PICTURE.querySelector('.social__caption').textContent = photoDescribeObjects[0].description;
BIG_PICTURE.querySelector('.social__comment-count').classList.add('visually-hidden');
BIG_PICTURE.querySelector('.social__comments-loader').classList.add('visually-hidden');

var OBJECT_COMMENTS_ARR = photoDescribeObjects[0].comments;

var renderComments = function(objCommentsArr) {
  var commentClone = COMMENT_TEMPLATE.cloneNode('true');
  commentClone.querySelector('.social__picture').src = `img/avatar-${getRandomInt(1,6)}.svg`;
  commentClone.querySelector('.social__text').textContent = objCommentsArr;
  return commentClone;
};

var commentFragment = document.createDocumentFragment();
for (var i = 0; i < OBJECT_COMMENTS_ARR.length; i++) {
  commentFragment.appendChild(renderComments(OBJECT_COMMENTS_ARR[i]));
};

COMMENTS.appendChild(commentFragment);
