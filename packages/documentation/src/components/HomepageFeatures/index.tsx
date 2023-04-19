import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Developer first',
    Svg: require('@site/static/img/developer.svg').default,
    description: (
      <>ContractCase is designed to be easy to add to an exiting project. If misconfigurations happens during testing, ContractCase will print helpful errors.
      </>
    ),
  },
  {
    title: 'Get deployment confidence',
    Svg: require('@site/static/img/pilot-case.svg').default,
    description: (
      <>
       Easily tell whether your services are able to communicate with each other, and deploy with confidence from the pub on a Friday.
      </>
    ),
  },
  {
    title: 'Easily extensible',
    Svg: require('@site/static/img/Suitcases.svg').default,
    description: (
      <>
        Don't have the matchers you want? Extend or customize your contract testing by implementing a simple interface.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
