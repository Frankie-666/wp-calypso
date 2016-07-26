/**
 * Internal dependencies
 */
import config from 'config';
import userFactory from 'lib/user';
import { makeLayout } from 'controller';
import { makeNavigation, siteSelection } from 'my-sites/controller';
import { singleSite, multiSite, loggedOut } from './controller';

export default function( router ) {
	const user = userFactory();
	const isLoggedIn = !! user.get();

	if ( config.isEnabled( 'manage/themes' ) ) {
		if ( isLoggedIn ) {
			router( '/design/:tier(free|premium)?', siteSelection, multiSite, makeNavigation, makeLayout );
			router( '/design/:tier(free|premium)?/:site_id', siteSelection, singleSite, makeNavigation, makeLayout );
		} else {
			router( '/design/:tier(free|premium)?', loggedOut, makeLayout );
		}
	}
}
