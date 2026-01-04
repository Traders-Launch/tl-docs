import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Lowest Entry Fee',
    emoji: '💰',
    description: (
      <>
        Start your trading evaluation for just $50 — the lowest in the industry.
        No hidden fees, no monthly subscriptions.
      </>
    ),
  },
  {
    title: 'Same-Day Payouts',
    emoji: '⚡',
    description: (
      <>
        Get funded and withdraw profits the same day. No weekly caps, no waiting periods.
        90% profit split goes directly to you.
      </>
    ),
  },
  {
    title: 'Payout Guarantee',
    emoji: '🛡️',
    description: (
      <>
        We're the only prop firm that guarantees your payouts. Trade with confidence
        knowing your profits are protected.
      </>
    ),
  },
];

function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <span style={{fontSize: '4rem'}}>{emoji}</span>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
