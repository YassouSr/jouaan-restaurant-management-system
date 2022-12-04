import React from "react";
import Button from "../../components/shared/Button";
import sharedStyles from "../../styles/pages/pages.module.css";

const Support = () => {
  return (
    <div>
      <h2 className={sharedStyles.heading}>Customer Support</h2>

      <p>How can we help you ?</p>

      <form action="post">
        <textarea
          className={sharedStyles.textarea}
          name="Support"
          placeholder="Write your issue ..."
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

export default Support;
