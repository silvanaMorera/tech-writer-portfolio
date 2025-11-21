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
    title: 'Developer-Focused API Docs',
    Svg: require('@site/static/img/undraw-code-review.svg').default,
    description: (
      <>
        Task-based, example-driven documentation for developers. Includes tutorials, reference, and clear error handling to help users get productive quickly.
        Created 20+ developer-focused docs and API samples through real hands-on testing.
      </>
    ),
  },
  {
    title: 'Docs-as-Code Workflow',
    Svg: require('@site/static/img/undraw-version-control.svg').default,
    description: (
      <>
       Documentation built with Docusaurus, versioned through GitHub, and auto-deployed with GitHub Actions in a modern docs-as-code pipeline.
       Maintained 300+ documentation updates through PR reviews, version control, and automated deployments.
      </>
    ),
  },
  {
    title: 'API Tooling & Developer Ecosystem',
    Svg: require('@site/static/img/undraw-testing.svg').default,
    description: (
      <>
        OpenAPI/Swagger specs, Postman Collections, cURL examples, environment variables, and CI/CD-friendly documentation aligned with developer-first standards. Developed working Postman Collections and OpenAPI samples based on real endpoints.
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