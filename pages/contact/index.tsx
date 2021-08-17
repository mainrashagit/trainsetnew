import Input from "@modules/form/Input/Input"
import TextArea from "@modules/form/TextArea/TextArea"
import Title from "@modules/text/Title/Title"
import { Field, Form, Formik } from "formik"
import Head from "next/head"
import { useEffect, useState } from "react"
import styles from "./index.module.sass"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const initialValues: { [e: string]: string } = {
    name: "",
    email: "",
    subject: "",
    message: "",
  }
  const [message, setMessage] = useState<string>()
  const [title, setTitle] = useState("")
  useEffect(() => {
    fetch("/api/title", {
      method: "POST",
      body: "248",
    })
      .then((r) => r.text())
      .then((d) => setTitle(d))
    return () => {}
  }, [])
  const spinner = (
    <>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        .lds-spinner {
          color: official;
          display: inline-block;
          position: relative;
          width: 40px;
          height: 40px;
          transform: scale(0.5);
        }
        .lds-spinner div {
          transform-origin: 40px 40px;
          animation: lds-spinner 1.2s linear infinite;
        }
        .lds-spinner div:after {
          content: " ";
          display: block;
          position: absolute;
          top: 3px;
          left: 37px;
          width: 6px;
          height: 18px;
          border-radius: 20%;
          background: #fff;
        }
        .lds-spinner div:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -1.1s;
        }
        .lds-spinner div:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -1s;
        }
        .lds-spinner div:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.9s;
        }
        .lds-spinner div:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.8s;
        }
        .lds-spinner div:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.7s;
        }
        .lds-spinner div:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.6s;
        }
        .lds-spinner div:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.5s;
        }
        .lds-spinner div:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.4s;
        }
        .lds-spinner div:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.3s;
        }
        .lds-spinner div:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.2s;
        }
        .lds-spinner div:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.1s;
        }
        .lds-spinner div:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
        }
        @keyframes lds-spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.fullHeightWrapper}>
        <div className={styles.authorization}>
          <div className={styles.authorization__titlesLinksWrapper}>
            <Title type="h1">Got Any Questions ?</Title>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const hasEmptyFields = Object.values(values).some((v) => v.length < 1)
              const hasEmail = values.hasOwnProperty("email")
              const emailTest = (value: string) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(value)
              const badEmail = !emailTest(values["email"])
              if (hasEmptyFields || (hasEmail && badEmail)) {
                setMessage("Please, fill all the fields correctly.")
                return
              }
              setSubmitting(true)
              setMessage("")
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                  Accept: "application/json, text/plain, */*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              })
              if (res.ok === false) {
                setSubmitting(false)
                setMessage("Error")
                return
              }
              setSubmitting(false)
              setMessage("Message sent! We will contact you shortly.")
              resetForm()
            }}
          >
            {({ isSubmitting }) => (
              <Form className={styles.form} style={{ display: "block" }}>
                <div className={styles.error}>{isSubmitting ? spinner : message}</div>
                <Field as={Input} type="text" placeholder="Name" name={"name"} />
                <Field as={Input} type="email" placeholder="Email" name={"email"} />
                <Field as={Input} type="text" placeholder="Subject" name={"subject"} />
                <Field as={TextArea} placeholder="Message" name={"message"} />

                <Input type="submit" value="Send" />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default index
