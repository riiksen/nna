import passport from 'passport'
import passportSteam from 'passport-steam'

import config from './config'

import User from '../models/user'

const SteamStrategy = passportSteam.Strategy

passport.serializeUser<any, any>((user, done) => {
  done(null, user.id)
})

// TODO(mike): type of id normally was number | string
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk<User>(id)
    if (!user) {
      done(new Error('user not found'))
    }

    done(null, user)
  } catch (e) {
    done(e)
  }
})

/**
 * Sign in with Steam
 */
passport.use(new SteamStrategy({
  returnURL: '/login/handle',
  realm: '',
  apiKey: config.steamApiKey
}, (identifier: any, profile: any, done: any) => {
  profile.identifier = identifier

  done(null, profile)
}))

export default passport
