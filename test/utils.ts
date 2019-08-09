import * as chai from 'chai';

import * as chaiHttp from 'chai-http';
import * as chaiStrategy from 'chai-passport-strategy';

chai.use(chaiHttp);
chai.use(chaiStrategy);

export { request, expect } from 'chai';
