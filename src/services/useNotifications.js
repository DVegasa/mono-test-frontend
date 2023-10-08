import { getCurrentInstance } from 'vue';
import 'element-plus/theme-chalk/src/notification.scss';
import { ElNotification } from 'element-plus';


export const useNotification = () => {
  const app = getCurrentInstance();

  const show = (props) => {
    props = {
      customClass: 'appNotificationClass type-' + props?.type ?? 'default',
      effect: 'dark',
      offset: 60,
      // position: 'bottom-left',
      ...props,
    }
    if (!app) ElNotification(props);
    else {
      const { appContext } = app;
      ElNotification(props, appContext);
    }
  };

  return {
    show
  };
};
