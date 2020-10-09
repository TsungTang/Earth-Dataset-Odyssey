# Earth Dataset Odyssey
## Introduction
EDO(Earth Dataset Odyssey) Recommender system. 
![](https://i.imgur.com/zPWMUlP.jpg)
EDO (Earth Dataset Odyssey), a lightweight geological dataset recommendation website with a built-in NLP recommendation engine. The homepage of EDO shows several recent earth disaster events. Through the article narration, it can help citizen scientists quickly grasp the outline of the issues, as well as the datasets related to the issues.

## Requirements
node version v10.17.0    
npm version 6.11.3    
docker-compose version 1.27.4    
Docker version 19.03.13    
python 3.7.9    
python3-pip    

## Getting Started
1. Clone the repository
```shell
cd ~
git clone git@github.com:TsungTang/Earth-Dataset-Odyssey.git
cd ~/Earth-Dataset-Odyssey
git submodule add git@github.com:bonzoyang/buyitcrashit.git backend
```

2. Update the backend submodule
```shell
cd ~/Earth-Dataset-Odyssey
git submodule update --init --recursive
```

3. Download file
```shell
cd ~/Earth-Dataset-Odyssey/backend/docker/rcmd
pip install gdown
bash -c "gdown https://drive.google.com/uc?id=1-nudWl3zA3zn0IMrq7Mk7Oirdgk5c8VP | python"
```

4. Run backend
```shell
cd ~/Earth-Dataset-Odyssey/backend/docker
docker-compose build
docker-compose up
docker-compose exec web bash -c "python manage.py migrate"
```

5. Run frontend
Start with another session in terminal.
```shell
cd ~/Earth-Dataset-Odyssey
npm install
npm run serve
```

6. Set up proxy server
Proxy Server only need in development server.    
Start with another session in terminal.
```
cd ~/Earth-Dataset-Odyssey/proxy-server
npm install
node index.js
```

7. Check it out
You may use Earth Dataset Odyssey project in    
[http://localhost:5566/#/edo/recommend-datasets](http://localhost:5566/#/edo/recommend-datasets)

## Related projects and reference papers
[1] Juan Ramos. (2003). Using TF-IDF to Determine Word Relevance in Document Queries.     
[2] Suzanne L. LeMoleSteven Howard Nurenberg Joseph Thomas O'NeilPeter H. Stuntebeck. (1995). Method and system for presenting customized advertising to a user on the world wide web, US Patent, 1999 - Google Patents.    
[3] J Pennington, R Socher, CD Manning. (2014). Glove: Global vectors for word representation.    
[4] Chun-Tan Cheng. (2012). Exploring Why Facebook Users Press the "Like" Button.    
[5] Derek J. de Solla Price. (July 30, 1965). Networks of Scientific Papers.    
[6] Francesco Ricci and Lior Rokach and Bracha Shapira. (2011). Introduction to Recommender Systems Handbook.    
[7] NASA Earthdata CMR Search, https://cmr.earthdata.nasa.gov/search    
[8] NASA Earth Observatory, https://earthobservatory.nasa.gov/    
[9] NASA Earthdata Search, https://search.earthdata.nasa.gov/search    