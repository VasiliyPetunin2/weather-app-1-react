import "./Alert.css";
import React, { useEffect } from "react";
import Button from "components/common/button/Button";
import { useAlert } from "hooks/useAlert";

const Alert = ({ error }) => {
   const { setIsAlert } = useAlert();

   useEffect(() => {
      setTimeout(() => {
         setIsAlert({
            active: false,
            isRequested: false,
            error: "",
         });
      }, 5000);
   }, []);

   return (
      <section className='alert'>
         <h2 className='alertWarning'>{error}</h2>
         <Button
            classes={["btn-alert"]}
            onClickFunc={(e) =>
               setIsAlert({
                  active: false,
                  isRequested: false,
                  error: "",
               })
            }
            content={
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 26 26'
                  fill='#EC6E4D'
               >
                  <path d='M26 2.61857L23.3814 0L13 10.3814L2.61857 0L0 2.61857L10.3814 13L0 23.3814L2.61857 26L13 15.6186L23.3814 26L26 23.3814L15.6186 13L26 2.61857Z' />
               </svg>
            }
         />
      </section>
   );
};

export default Alert;
