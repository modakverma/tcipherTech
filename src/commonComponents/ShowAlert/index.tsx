import Alert from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";

interface IProps {
  message: string;
  handleAlertDismiss: any;
  showAlert: boolean;
  variant: string;
}

const ShowAlert = (props: IProps) => {
  const {message, handleAlertDismiss, showAlert, variant} = props;
  if(!showAlert) {
    return <div/>
  }
  return (
      <div className="slide-up-div absolute -bottom-1 w-2/5 h-20 animate-slide-up z-20 m-5 transition-timing-function:cubic-bezier(1.4, 0, 1, 1)">
          <Alert variant={variant} className="flex items-center mb-2">
            <>
              <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" />{" "}
              {message}
              <Alert.DismissButton type="button" className="text-white" aria-label="Close" onClick={handleAlertDismiss}>
                  <Lucide icon="X" className="w-4 h-4" />
              </Alert.DismissButton>
            </>
          </Alert>
        </div>
  )
}

export default ShowAlert;