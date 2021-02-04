import Head from 'next/head'
import { Toolbar } from "../components/toolbar"
import styles from "../styles/EOM.module.css"

export function EOM({employee}) {
    console.log(employee.results[0])
    return (
        <>
        <Head>
            <title>News API | Employee of the Month</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toolbar />
        <div className={styles.main}>
            <h1>Employee of the Month</h1>
        <div className={styles.employeeOfTheMonth}>
            <h3>{employee.results[0].name.title}{" "}{employee.results[0].name.first}{" "}{employee.results[0].name.last}</h3>
            <h6>{employee.results[0].email}</h6>
            <h6>{employee.results[0].phone}</h6>
            <img src={employee.results[0].picture.large} />
        </div>
        </div>
        </>
    )
}

export const getServerSideProps = async pageContext =>{
    const apiResponse = await fetch('https://randomuser.me/api/')
    const employee = await apiResponse.json()
    return{ 
        props : {
            employee
        }
    }
}

export default EOM;