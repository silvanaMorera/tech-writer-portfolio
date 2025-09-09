import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Developer-Focused Docs',
    Svg: require('@site/static/img/undraw-code-review.svg').default,
    description: (
      <>
        Task based, concise documentation designed for developers. 
        Includes tutorials, reference, and error handling to get users productive quickly.
      </>
    ),
  },
  {
    title: 'Docs-as-Code Workflow',
    Svg: require('@site/static/img/undraw-version-control.svg').default,
    description: (
      <>
       Built with Docusaurus, versioned in GitHub, and auto-deployed 
        using GitHub Actions.
      </>
    ),
  },
  {
    title: 'Tools & Standards',
    Svg: require('@site/static/img/undraw-testing.svg').default,
    description: (
      <>
        OpenAPI/Swagger, Postman collections, and CI/CD pipelines. 
        Style aligned with the Microsoft Writing Style Guide.
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