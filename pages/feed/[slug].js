import Head from "next/head"
import { Toolbar } from "../../components/toolbar"
import styles from "../../styles/Feed.module.css"

export const Feed = ({pageNumber, articles}) =>{
    const urlToImage= articles.articles[pageNumber - 1].urlToImage
    
    return(
        <>
        <Head>
            <title>{articles.articles[pageNumber - 1].title}</title>
            <meta property="og:image" content={urlToImage}></meta>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toolbar />
        <div className={styles.main}>
            <h1>{articles.articles[pageNumber - 1].title}</h1>
            <h3>{articles.articles[pageNumber - 1].description}</h3>
            <p>{articles.articles[pageNumber - 1].url}</p>
            <img src={urlToImage} />
            <h1>{articles.articles[pageNumber - 1].title}</h1>
        </div>
        </>
    )
}

export const getServerSideProps = async pageContext =>{
    let pageNumber = pageContext.query.slug;
    if(!pageNumber || pageNumber<1 || pageNumber > 5 ){
        pageNumber = 1
    }

    const apiResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=in&pageSize=5&page=${pageNumber}&apiKey=2df6a769c9f749069db88d5e07cb0e00`)

    const news = await apiResponse.json()
    return{
        props:{
            pageNumber,
            articles : news
        }
    }
}

export default Feed;