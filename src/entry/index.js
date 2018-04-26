import dva from 'dva';
import createLoading from 'dva-loading';
import './index.less';

// 1. Initialize
const app = dva({
  onError(error) {
    console.error(error);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../models/app'));
app.model(require('../models/login'));
// app.model(require('../models/dashboard'));
app.model(require('../models/Admin/home'));
app.model(require('../models/Admin/experiment'));
app.model(require('../models/Admin/student'));
app.model(require('../models/Teacher/home'));
app.model(require('../models/Teacher/myExperiment'));
app.model(require('../models/Student/home'));
app.model(require('../models/Student/myExperiment'));

// 4. Router
app.router(require('../routes'));

// 5. Start
app.start('#root');
