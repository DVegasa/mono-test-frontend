import {createApp} from 'vue';
import App from './App.vue';
import router from './router';

import '@/styles/app/global.scss';

// region ElementPlus
import '@/styles/element-plus/before.scss';
import ElementPlus from 'element-plus';
import '@/styles/element-plus/after.scss';
import ru from 'element-plus/dist/locale/ru.mjs';
// endregion

const app = createApp(App);
app.use(ElementPlus, {locale: ru});
app.use(router);

app.mount('#app');
