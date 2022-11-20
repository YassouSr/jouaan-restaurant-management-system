import React from "react";
import Button from "../../components/shared/Button";
import sharedStyles from "../../styles/pages/pages.module.css";

const Feedback = () => {
  return (
    <div>
      <h2 className={sharedStyles.heading}>Feedback</h2>

      <p>We'd love to hear from you what you’ve experienced with us.</p>

      <form action="post">
        <textarea
          className={sharedStyles.textarea}
          name="feedback"
          placeholder="Write your feedback ..."
        />
        <Button
          class={sharedStyles.pageBtn}
          text="Send"
          color="var(--shade100)"
          bgColor="var(--success)"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Feedback;
