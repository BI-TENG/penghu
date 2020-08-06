<template>
  <div id="home">
    <b-carousel id="carousel-fade" fade >
      <b-carousel-slide>
        <template v-slot:img>
          <video autoplay muted loop :src="'./images/澎湖.mp4'" width="100%" height="100%"></video>
        </template>
      </b-carousel-slide>
    </b-carousel>

    <b-media class="mt-5">
        <template v-slot:aside>
          <u-animate-container>
            <u-animate
              name="animate__fadeInLeft"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="450"
              animateClass="animated"
              :begin="false">
              <b-img :src="'http://220.128.133.15/s1090116/1594454308367.jpg'" rounded></b-img>
              <b-link to="/explore">探索</b-link>
            </u-animate>
          </u-animate-container>
        </template>
          <h5>
            澎湖哪裡好吃好玩以及推薦的行程，讓你一目了然!
          </h5>
    </b-media>

    <b-media right-align>
        <template v-slot:aside>
          <u-animate-container>
            <u-animate
              name="animate__fadeInRight"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="450"
              animateClass="animated"
              :begin="false">
              <b-img :src="'http://220.128.133.15/s1090116/1594487895394.jpg'" rounded></b-img>
              <b-link to="/activity">活動</b-link>
            </u-animate>
          </u-animate-container>
        </template>
          <h5>
            蒐羅澎湖的主題活動，讓你認識不同風貌的澎湖
          </h5>
    </b-media>

    <b-media>
        <template v-slot:aside>
          <u-animate-container>
            <u-animate
              name="animate__fadeInLeft"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="400"
              animateClass="animated"
              :begin="false">
              <b-img :src="'http://220.128.133.15/s1090116/1594462927068.jpg'" rounded></b-img>
              <b-link to="/planning">規劃</b-link>
            </u-animate>
          </u-animate-container>
        </template>
          <h5>
            說走就走!規劃自己的澎湖行吧!
          </h5>
    </b-media>

    <b-media right-align>
        <template v-slot:aside>
          <u-animate-container>
            <u-animate
              name="animate__fadeInRight"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="250"
              animateClass="animated"
              :begin="false">
              <b-img :src="'http://220.128.133.15/s1090116/1594462908633.png'" rounded></b-img>
              <b-link to="/album">相簿</b-link>
            </u-animate>
          </u-animate-container>
        </template>
          <h5 class="i4">
            增添自己的澎湖回憶!並記錄不同時期的澎湖行。
          </h5>
    </b-media>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#56B6DD" fill-opacity="0.7" d="M0,288L48,288C96,288,192,288,288,266.7C384,245,480,203,576,192C672,181,768,203,864,197.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      <path fill="#56B6DD" fill-opacity="0.3" d="M0,96L60,106.7C120,117,240,139,360,133.3C480,128,600,96,720,80C840,64,960,64,1080,96C1200,128,1320,192,1380,224L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
    </svg>
  </div>
</template>
