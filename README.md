# Earth Dataset Odyssey


## Demo

[demo video](https://drive.google.com/file/d/1x_qeUf2P5QO055tw9f1-H-UKFrqMpy1f/view?usp=sharing)

![](https://i.imgur.com/zPWMUlP.jpg)


![](https://i.imgur.com/OrogLNr.jpg)


![](https://i.imgur.com/dm8kacY.png)

![](https://i.imgur.com/j6sTWk5.png)

![](https://i.imgur.com/mTruDPx.png)

![](https://i.imgur.com/jeto19Y.png)


## Related Backend Repo

https://github.com/bonzoyang/buyitcrashit

### Quick Start

```
git clone git@github.com:bonzoyang/buyitcrashit.git
cd ./buyitcrashit/docker
```

### download pkl file

https://drive.google.com/file/d/1zHPRxMaDGDYh_RH3I2h7LIonDi26mNvq/view?fbclid=IwAR1vw69yeCJqGgYH0JBYwH3oJSt0_c9mZ_oSaZXroAPKUl1W8m3lUDsyOqA

請將下載後的pkl檔放入 `./buyitcrashit/docker/rmd` 資料夾


### docker
```
docker-compose build
docker-compose up 
```


backend server will run on localhost:8000

## Frontend

```
git clone git@github.com:TsungTang/Earth-Dataset-Odyssey.git
cd ./Earth-Dataset-Odyssey
```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Proxy server

Proxy Server only need in development server

```
cd ./proxy-server
npm install
node index.js
```
