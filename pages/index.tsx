import styles from "./index.module.sass"
import Title from "@modules/text/Title/Title"
import Card from "@modules/Card/Card"
import Button from "@modules/Button/Button"
import Link from "next/link"

interface Props {}

export default function Home({}: Props) {
  return (
    <>
      <section className={styles.firstScreen}>
        <div className={styles.firstScreen__wrapper}>
          <div className={styles.firstScreen__column}>
            <div className={styles.firstScreen__title}>
              <Title type="h1">
                TrainSet ― Your data science career starts now!
              </Title>
            </div>
            <h5 className={styles.firstScreen__suptitle}>
              TrainSet is a platform where you can gain practical skills in
              machine learning and data science while solving real cases. Become
              much more desirable for potential employers in 3 easy steps.
            </h5>
            <Link href="/projects">
              <a className={styles.firstScreen__topbutton}>
                Try for Free
              </a>
            </Link>
          </div>

          <div className={styles.firstScreen__image}>
            <img src="/images/index/1.png" alt="programming language python" />
          </div>
        </div>
      </section>

      <div
        className={styles.firstScreen__title}
        style={{ marginTop: 0, maxWidth: "auto" }}
      >
        <Title type="h2">How does TrainSet Work?</Title>
      </div>
      <h5 className={styles.firstScreen__suptitle}>
        <span style={{ fontWeight: 500, color: "#337AB6" }}>Step 1.</span>
        Register. It won’t take much time! Just insert your login and email.
        <br />
        <span style={{ fontWeight: 500, color: "#337AB6" }}>Step 2.</span>
        Receive the credentials for Jypiter. Jypiter is a tool that data scientists use in their work. We will automatically sign you up so that you wouldn’t have to.
        <br />
        <span style={{ fontWeight: 500, color: "#337AB6" }}>Step 3.</span> Open the project. Click on any project you like and you will be automatically sent to Jypiter. There you will find all the instructions and coding space.
      </h5>

      <section className={styles.projects}>
        <div className={styles.projects__wrapper}>
          <div className={styles.projects__title}>
            <Title type="h2">Projects</Title>
          </div>
          <div className={styles.projects__row}>
            <Card
              about={[
                "Learn to predict the possibility of heart disease with popular ML tools. Accessible for beginners.",
              ]}
              level={"Level 1"}
              img={"/cards/3.png"}
              imgAlt={"heart"}
              title={"Heart Disease Prediction"}
              pId={2}
              more={true}
            />

            <Card
              title={"Time Series Forecasting"}
              about={[
                "The stock market goes up and down in a blink. Keep an eye on market fluctuations with the help of data science. For medium to advanced learners.",
              ]}
              img={"/cards/4.png"}
              imgAlt={"time"}
              pId={4}
              level={"Level 3"}
              more={true}
            />
          </div>

          <div className={styles.projects__button}>
            <Button type="hollow">
              <Link href="#">
                <a>see more</a>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.aboutUs}>
        <div className={styles.aboutUs__wrapper}>
          <div className={styles.aboutUs__title}>
            <Title type="h2">About us</Title>
          </div>

          <div className={styles.aboutUs__image}>
            <img src="/images/aboutUs/1.png" alt="our team" />
          </div>

          <div className={styles.aboutUs__column}>
            <p className={styles.aboutUs__text}>
              TrainSet is a community of engineers and data scientists
              passionate about learning. Our team has hands-on experience
              working for leading tech companies. And we are ready to share it
              with you.
            </p>

            <p className={styles.aboutUs__text}>
              Here you will find real enterprise-level cases. We broke them down
              into easy-to-learn chunks: even a beginner can kick off learning
              ML with TrainSet.
            </p>
            <p className={styles.aboutUs__text}>
              <b>Less theory, more practice.</b>
            </p>
            <p className={styles.aboutUs__text}>
              We are convinced: anyone can become a data scientist. Background
              doesn’t matter ― as long as you do what you love.
            </p>
            <p className={styles.aboutUs__text}>
              We are here to help. Join TrainSet to start cracking data science
              cases.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.faq__title} style={{ textAlign: "center" }}>
          <Title type="h2">You should kick off with TrainSet if you are…</Title>
        </div>
        <img className={styles.faq__diag} src="/images/index/diag.svg" alt="" />
      </section>

      <section className={styles.faq}>
        <div className={styles.faq__wrapper}>
          <div className={styles.faq__title}>
            <Title type="h2">Frequently Asked Questions</Title>
          </div>

          <div className={styles.faq__column}>
            <p className={styles.faq__question} data-t-show="1">
              What is the difference between artificial intelligence, machine
              learning, and data science?
            </p>
            <p className={styles.faq__answer} data-t-show="2">
              Artificial intelligence is a scientific field that tries to get
              computers to learn, reason, and create. Machine learning is one of
              the sub-fields of AI. It uses algorithms to enable computers to
              learn on their own and improve their performance through
              experience. Finally, data science is a field that cares, first and
              foremost, about the data that you input into the algorithms. Data
              scientists collect, sort, and analyze this data that machines can
              use to learn about reality and solve complicated tasks.
            </p>

            <p className={styles.faq__question} data-t-show="3">
              How do I start with artificial intelligence/machine learning/data
              science?
            </p>
            <p className={styles.faq__answer} data-t-show="4">
              Before you start with AI/ML/DS, you need to get some basic
              knowledge of what computer programming is and how it works. There
              are many good courses in free access online that you can use to
              build your knowledge. They talk about general notions such as
              memory, data structures, algorithms, functions, and so on. After
              that, you can start familiarizing yourself with the theory of AI.
              Along with theory, start practicing! The earlier you learn at
              least one programming knowledge, the better. And TrainSet will
              help you!
            </p>

            <p className={styles.faq__question} data-t-show="5">
              Do I need to have a technical background?
            </p>
            <p className={styles.faq__answer} data-t-show="6">
              ‘One needs to have a degree in math, computer science, or
              engineering to be a data scientist’... is nothing more but a myth.
              The truth is that if you’re motivated and eager to learn, nothing
              can stop you! However, to work in data science you will probably
              have to learn a lot of new things, especially if you have never
              worked in a similar field before. So be ready for that :)
            </p>

            <p className={styles.faq__question} data-t-show="7">
              Where do I start on TrainSet if I’m a complete beginner?
            </p>
            <p className={styles.faq__answer} data-t-show="8">
              We made sure that even if you’re a complete beginner, you will
              still find TrainSet useful. We recommend you start with the Car
              Price Prediction project. And if need be, ask any questions in
              Slack!
            </p>

            <p className={styles.faq__question} data-t-show="9">
              I have some experience in programming. Can I still use TrainSet?
            </p>
            <p className={styles.faq__answer} data-t-show="10">
              Of course! While our platform is meant for the education of
              junior/middle data scientists, we also tried to include more
              advanced tasks in many of our cases. Therefore, if you already
              know how to program or have some experience with data science, you
              can still practice on TrainSet.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.askQuestion}>
        <div className={styles.askQuestion__wrapper}>
          <div className={styles.askQuestion__title}>
            <Title type="h2">Didn&apos;t find an answer?</Title>
          </div>
          <h5 className={styles.askQuestion__suptitle}>
            Join our ML community in Slack, we&apos;d love to help you out on your
            data science jorney
          </h5>

          <div className={styles.askQuestion__button}>
            <Button>
              <Link href="#">
                <a>Ask a question</a>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
