import { useEffect, useState } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';
import wordToNumber from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles';


const alanKey = '4323b7dfa1d9f04f46c1096a8a839d792e956eca572e1d8b807a3e2338fdd0dc/stage'

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles, number}) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles)
          setActiveArticle(-1);
        }else if(command === 'highlight'){
          setActiveArticle(prevState => prevState + 1);
        }else if(command === 'open'){
          const articleNumber = wordToNumber(number, {fuzzy: true});
          setActiveArticle((articleNumber - 1));

          if(articleNumber > articles){ 
            alanBtn().playText('Please choose a number below 20.')
          }else{
            window.open(articles[(articleNumber - 1)].url, '_blank');
            alanBtn().playText('Opening...')
          }

        }
      }
    })
  }, [])


  return (
    <div>
      <div className={classes.alanLogoContainer}>
        <img  src="https://th.bing.com/th/id/R.089c829d955dafe11f802dbb30074551?rik=NQxhcGF5tHDPbw&pid=ImgRaw&r=0&sres=1&sresct=1" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
