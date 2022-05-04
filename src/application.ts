import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent, TokenServiceBindings, UserServiceBindings
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {LocalDataSource} from './datasources';
import {UserCredentialsRepository, UserRepository} from './repositories';
import {MySequence} from './sequence';
import {JWTService} from './services/jwt.service';
import {CostumUserService} from './services/user.service';

export {ApplicationConfig};

export class LiftyApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    // ------ Add snippet at the bottom ---------

    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    //this.component(JWTAuthenticationComponent);
    // Bind datasource
    //this.dataSource(LocalDataSource, UserServiceBindings.DATASOURCE_NAME);


    this.component(JWTAuthenticationComponent);
    // Bind datasource
    this.dataSource(LocalDataSource, UserServiceBindings.DATASOURCE_NAME);
    // Bind user service
    this.bind(UserServiceBindings.USER_SERVICE).toClass(CostumUserService),
      // Bind user and credentials repository
      this.bind(UserServiceBindings.USER_REPOSITORY).toClass(
        UserRepository,
      ),
      this.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(
        UserCredentialsRepository,
      ),
      this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService)
    // ------------- End of snippet -------------
  }
}
