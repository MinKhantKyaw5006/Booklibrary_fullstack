import {Client as WorkflowClient} from '@upstash/workflow'
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from './config'

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
})

//this part is responsible for sending email with resend,
const qstashClient = new QStashClient({
    token: config.env.upstash.qstashToken,
  });

  export const sendEmail = async ({
    email,
    subject,
    message,
  }: {
    email: string;
    subject: string;
    message: string;
  }) => {
    await qstashClient.publishJSON({
      api: {
        name: "email",
        provider: resend({ token: config.env.resendToken }),
      },
      body: {
        from: "LucasDev <onboarding@resend.dev>",  //we don't have domain yet so this is default one works only in dev
        to: [email],
        subject,
        html: message,
      },
    });
  };