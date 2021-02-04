export const Feed = ({pageNumber, articles}) =>{
    console.log(pageNumber)
    console.log(articles.articles[pageNumber - 1])
    return(
        <div>
            Hello World
        </div>
    )
}

export const getServerSideProps = async pageContext =>{
    const pageNumber = pageContext.query.slug;
    if(!pageNumber || pageNumber<1 || pageNumber > 5 ){
        return{
            props: {
                articles: [],
                pageNumber: 1
            }
        }
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