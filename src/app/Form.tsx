import { useHubspotForm } from "next-hubspot";

const HubspotForm = (props: { setOpen: any; open: boolean }) => {
  const { loaded, error, formCreated } = useHubspotForm({
    portalId: "26500126",
    formId: "6fb72615-a5ef-45e3-9181-ef7c59acdf5c",
    target: ".hubspot-form-wrapper",
    onFormSubmit: () => {
      props.setOpen((prev: boolean) => {
        return !prev;
      });
    },
  });
  return <div className="hubspot-form-wrapper " />;
  //   {
  //     props.open && loaded ? <>return</> : null;
  //   }
};
// region: "eu1",
//             portalId: "26500126",
//             formId: "6fb72615-a5ef-45e3-9181-ef7c59acdf5c"
export default HubspotForm;
