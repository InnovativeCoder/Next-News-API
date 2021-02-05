import Head from "next/head"
import { useRouter } from "next/router"
import { Toolbar } from "../../components/toolbar"
import styles from "../../styles/Feed.module.css"

export const Feed = ({pageNumber, articles}) =>{
    const urlToImage= articles.articles[pageNumber - 1].urlToImage
    const router = useRouter();
    return(
        <>
        <Head>
            <title>{articles.articles[pageNumber - 1].title}</title>
            <meta property="og:image" content={urlToImage}></meta>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toolbar />
        <div className={styles.main}>
            <div className={styles.post}>
                <h1>{articles.articles[pageNumber - 1].title}</h1>
                <h3>{articles.articles[pageNumber - 1].description}</h3>
                <p>{articles.articles[pageNumber - 1].url}</p>
                <img src={urlToImage} />
            </div>
            <div className={styles.paginator}>
                <div
                onClick={()=>{
                    if(pageNumber>1){
                        router.push(`/feed/${pageNumber - 1}`).then(()=>{
                            window.scrollTo(0,0)
                        })
                    }
                }}
                className={pageNumber==="1"? styles.disabled: styles.active}
                >
                    Previous Page
                </div>
                <div className={styles.number}>
                    #{pageNumber}
                </div>
                <div
                onClick={()=>{
                    if(pageNumber<5){
                        router.push(`/feed/${Number(pageNumber) + 1}`).then(()=>{
                            window.scrollTo(0,0)
                        })
                    }
                }}
                className={pageNumber==="5"? styles.disabled: styles.active}
                >
                    Next Page
                </div>
            </div>
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