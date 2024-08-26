// src/components/Email/EmailTemplate.tsx
import React from "react";
interface EmailTemplateProps {
    firstName: string;
    verifyLink: string;
  }
  
  const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName, verifyLink }) => (
    <div>
      <h1>Welcome to Our Service!</h1>
      <p>Hello {firstName},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href={verifyLink}>Verify Email</a>
    </div>
  );
  
  export default EmailTemplate;
  