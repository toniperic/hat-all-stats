import React from 'react';
import './Layout.css'
import { Translation } from 'react-i18next'
import '../../i18n'
import i18n from '../../i18n';
import Cookies from 'js-cookie';
import { YMInitializer } from 'react-yandex-metrika';

abstract class Layout<Props, State> extends React.Component<Props, State> {
    
    abstract topMenu(): JSX.Element;

    abstract content(): JSX.Element;

    abstract leftMenu(): JSX.Element

    private changeLanguage(lang: string) {
        Cookies.set('hattid_language', lang, { sameSite: "Lax", expires: 180})
        i18n.changeLanguage(lang)
    }

    render() {
        if(Cookies.get('hattid_language')) {
            this.changeLanguage(Cookies.get('hattid_language') || 'en')
        }
        return <Translation>
        { (t, { i18n }) => 
        <div className='main_frame'>
            <YMInitializer accounts={[67069579]} />
            <aside className="top_links">
                <span className="suggestions_reports">
                    Any suggestions/bugs? <a className="aside_link" target="_tab" href="https://www.hattrick.org/goto.ashx?path=/MyHattrick/Inbox/?actionType=newMail%26userId=4040806">Contact me at Hattrick</a>
                </span>
                <span className="language_links">
                    <button className="language_link_button" onClick={(e) => this.changeLanguage("en")}>en</button>
                    <button className="language_link_button" onClick={(e) => this.changeLanguage("es")}>es</button>
                    <button className="language_link_button" onClick={(e) => this.changeLanguage("de")}>de</button>
                    <button className="language_link_button" onClick={(e) => this.changeLanguage("hr")}>hr</button>
                    <button className="language_link_button" onClick={(e) => this.changeLanguage("it")}>it</button>
                    <button className="language_link_button" onClick={(e) => this.changeLanguage("ru")}>ru</button>
                </span>
            </aside>
            <header className="header">{this.topMenu()}</header>
            <main className="main_content">
                <aside className="left_side">
                    {this.leftMenu()}
                </aside>
                <section className="content">
                    {this.content()}
                  
                </section>
            </main>
            <footer className="credentials">
                Powered by React, Scala Play & ClickHouse. <a className="aside_link" target="_tab" href="https://github.com/Blackmorse/hat-all-stats">GitHub</a>
            </footer>
        </div>
        }
        </Translation>
    }
}

export default Layout