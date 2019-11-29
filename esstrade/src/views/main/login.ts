import inquirer from 'inquirer';
import chalk from 'chalk';
import clear from 'clear';
import { getRepository } from 'typeorm';
import { User } from '../../classes/user';
import { MainMenu } from './main_menu';
import { LoggedMenu } from '../user/logged_menu';
import { Asset } from '../../classes/asset';
import { Trader } from '../../classes/platform/trader';
import { LongCFD } from '../../classes/longcfd';
import { ShortCFD } from '../../classes/shortcfd';

export function Login(assets: Asset[]): void {
    inquirer.prompt([
        { type: "input", name: "email", message: "Email: " },
        { type: "password", name: "password", mask: "*", message: "Password: " }])
        .then(async answers => {
            let email = answers.email;
            let password = answers.password;

            var user: User;
            user = await getRepository(User).findOne({ where: { Email: email } });            
            //console.log(user);
            
            if (user != undefined && user.CheckLoginCredentials(email, password)) {
                user.SetSubject(user.GetFollows())
                var trader: Trader = await CreateTrader(user, assets);
                //clear();
                LoggedMenu(false, trader);
            } else {
                clear();
                console.log(chalk.red('Incorrect email/password, please try again'))
                MainMenu(false, assets);
            }
        })
}


async function CreateTrader(user: User, assets: Asset[]): Promise<Trader> {
    var trader: Trader;

    var longCFDs: LongCFD[] = await getRepository(LongCFD).find({ where: { Closed: false, User: user } });

    var shortCFDs: ShortCFD[] = await getRepository(ShortCFD).find({ where: { Closed: false, User: user } });

    var closedLongCFDs: LongCFD[] = await getRepository(LongCFD).find({ where: { Closed: true, User: user } });;
    var closedShortCFDs: ShortCFD[] = await getRepository(ShortCFD).find({ where: { Closed: true, User: user } });;

    //console.log(user);

    trader = new Trader(user, assets, longCFDs, shortCFDs, closedLongCFDs, closedShortCFDs);

    return trader;
}