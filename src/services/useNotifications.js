import {getCurrentInstance} from 'vue';
import 'element-plus/theme-chalk/src/notification.scss';
import {ElNotification} from 'element-plus';

const baseProps = {
  offset: 60,
};

export const useNotification = () => {
  const app = getCurrentInstance();

  const show = (props) => {
    props = {
      ...baseProps,
      ...props,
    };
    if (!app) ElNotification(props);
    else {
      const {appContext} = app;
      ElNotification(props, appContext);
    }
  };

  const showApiException = (apiException) => {
    show({
      ...baseProps,
      type: 'error',
      message: apiException?.message,
    });
  };

  return {
    show,
    showApiException,
  };
};
