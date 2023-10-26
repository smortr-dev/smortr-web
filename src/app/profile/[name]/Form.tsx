import { useHubspotForm } from "next-hubspot";

const HubspotForm = (props: {
  setOpen: any;
  open: boolean;
  setFormSubmitted: any;
  formSubmitted: boolean;
}) => {
  const { loaded, error, formCreated } = useHubspotForm({
    portalId: "26500126",
    formId: "6fb72615-a5ef-45e3-9181-ef7c59acdf5c",
    target: ".hubspot-form-wrapper",
    onFormSubmitted: () => {
      console.log("submitted");
      props.setFormSubmitted(true);
    },
  });
  return !props.formSubmitted ? (
    <div className="hubspot-form-wrapper " />
  ) : (
    <>
      <div className="h-full w-full flex text-center flex-col justify-center items-center">
        <h1 className="text-center font-bold text-[1.5rem] mt-2">
          Thanks for your response!
        </h1>
      </div>
    </>
  );
  //   {
  //     props.open && loaded ? <>return</> : null;
  //   }
};
// region: "eu1",
//             portalId: "26500126",
//             formId: "6fb72615-a5ef-45e3-9181-ef7c59acdf5c"
export default HubspotForm;
