import React, { useContext } from 'react';
import { Textfit } from 'react-textfit';
import MGContext from '../MGContext';
import { MessageTypes } from '../MGConfig';
import styles from './Lobby.module.css';

function Lobby() {
  const { room, state, isHost } = useContext(MGContext);

  const start = () => {
    room.send(MessageTypes.START);
  };

  const hostname = <span style={{ color: 'var(--pink)' }}>{state.host.name}</span>;

  const isBtnActive = state.players.size > 0;

  return (
    <div className={styles.wrapper}>
      <Textfit className={styles.top}>ID кімнати: <span style={{ color: 'var(--pink)' }}>{room.id}</span>. Чекаємо на інших гравців...</Textfit>

      {isHost
        ? <input type="button" onClick={start} value="Start" disabled={!isBtnActive} />
        : <div className={styles.empty} />}

      <h2>Необов&apos;язкова історія, яку можна не читати</h2>
      <Textfit className={styles.story} style={{ color: 'white' }}>
        Надворі 2073 рік. Україна одна з найрозвиненіших країн світу та перша
        у технологіях переміщення у мультивсесвіті. <br />
        Кожен всесвіт має свої закони та правила. Цього разу ми відправились до
        всесвіту з кодовою назвою <span style={{ color: 'var(--orange)' }}>&quot;FLWRLD-13&quot;</span>,
        де головною валютою є відповіді. Окрім цього,
        <span style={{ color: 'var(--orange)' }}> &quot;FLWRLD-13&quot; </span>
        дуже схожий на наш <span style={{ color: 'var(--green)' }}>&quot;RTH-01&quot;</span>
        , навіть історією та існуючими
        технологіями. Але наше прибуття до іншого всесвіту не задалося з
        самого початку: нас розкидало на декілька світових років від квантового
        телепорту, тому ми не могли повернутися додому. <br />
        Близько трьох місяців ми добиралися один до одного, щоб продовжити пошуки
        разом, й ось, сталось несподіване, коли майже всі зустрилися, до нас прийшло
        повідомлення від {hostname}, де говорилося, що він знайшов телепорт, тому нам
        лише залишилося прибути до його місця розташування, але.. ця гарна новина
        стала початком голодних ігор. <br />
        Наші кораблі не були розраховані на більш ніж одну особу, а енергії у
        телепорті становилось все менше й менше, отже, ми зрозуміли, що
        лише {hostname} та один з нас зможе пройти через телепорт, коли ми до нього
        дістанимось. Іншим не вистачить заряду телепорту, тому вони залишуться
        у цьому всесвіті, поки не прийде допомога. <br />
        Ми почали змагатися за збір топлива, відповідаючи на питання продавців,
        на шляху до {hostname}, так як це головне джерело нашого життя у цей час.
        Хто збере більше топлива та першим дістаниться до телепорту? Зараз ми це дізнаємось
      </Textfit>
    </div>
  );
}

export default Lobby;
