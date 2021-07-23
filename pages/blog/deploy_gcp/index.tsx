import Link from "next/link"
import styles from "./index.module.sass"
import Sidebar from "@modules/text/Sidebar/Sidebar"

interface Props {}

const index: React.FC<Props> = ({}) => {
  const text = [
    {
      title:
        "Part 1: Setting up the Google Project and Compute Engine Instance",
      steps: [
        {
          title:
            "Step 1: Create a free account in Google Cloud with 300$ credit.",
          text: "For this step, you will have to put your payment information and verify your account. It’s the most simple step. If you fail this step, close your laptop and think where you are going in life.",
        },
        {
          title: "Step 2: Create a new project.",
          text: [
            "You can either use an existing Google Cloud project or create a new one over",
            {
              a: "https://console.cloud.google.com/projectcreate",
              text: "here",
            },
            ".",
          ],
        },
        { img: "/academy/1.gif" },
      ],
    },
  ]
  return (
    <>
      <section className="projects">
        <div className="container">
          <h2 className="title projects__title">TrainSet Academy</h2>
          <Sidebar
            items={[
              {
                text: "Cross-Validation the Right Way",
                link: "/blog/cross_validation",
              },
              {
                text: "Running Jupyter Notebooks on Google Cloud",
                link: "/blog/deploy_gcp",
                active: true,
              },
            ]}
          />
        </div>
      </section>
    </>
  )
}

export default index
