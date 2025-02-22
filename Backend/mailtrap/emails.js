import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailsTemplates.js";
import { Mailtrapclient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipeint = [{ email }];
  try {
    const response = await Mailtrapclient.send({
      from: sender,
      to: recipeint,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification ",
    });

    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const welcomeEmail = async (email, name) => {
  const recipeint = [{ email }];
  try {
    const response = await Mailtrapclient.send({
      from: sender,
      to: recipeint,
      template_uuid: "82d3de1e-8aa9-410f-bc71-829da48bca36",
      template_variables: {
        company_info_name: "Yovix",
        name: name,
      },
    });
    console.log(`welocme Email Sent SuccessFully  ${response}`);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
};

export const SendResetEmail = async (email, resetURL) => {
  const recipeint = [{ email }];
  try {
    const response = await Mailtrapclient.send({
      to: recipeint,
      from: sender,
      subject: "reset password email",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(`{resetURL}`, resetURL),
      category: "reset-password",
    });
  } catch (error) {
    console.log("Error in sending a reset email");
    throw new Error("Error in sending a reset password" + error);
  }
};

export const SendSuccessEmail = async (email) => {
  const recipeint = [{ email }];
  try {
    const response = await Mailtrapclient.send({
      to: recipeint,
      from: sender,
      subject: "success email ",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "success email ",
    });

    console.log(" email sent success Fullly ");
  } catch (error) {
    console.log(" error in sending success email ");
    throw new Error("error in sending a successEmail" + error.message);
  }
};
