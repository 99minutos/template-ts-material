import { ArrowForward } from '@mui/icons-material';
import { Breadcrumbs, Container } from '@mui/material';
import { Link } from 'react-router-dom';

interface BreadcrumbSection {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  sections: BreadcrumbSection[];
  description?: string;
  actions?: React.ReactNode;
  module?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Breadcrumb(props: BreadcrumbProps) {
  const content = (
    <>
      <div className="grid grid-cols-2 py-4">
        <div className="flex items-center justify-start">
          <div className="">
            <ArrowForward className="text-primary" />
          </div>
          <div className="ml-4">
            <Breadcrumbs>
              {props.sections.map((section, index) =>
                section.link ? (
                  <Link
                    key={index}
                    to={section.link}
                    className="text-2xl text-secondary hover:underline"
                  >
                    {section.label}
                  </Link>
                ) : (
                  <span key={index} className="text-2xl">
                    {section.label}
                  </span>
                ),
              )}
            </Breadcrumbs>
            <p className="text-gray-600">{props.description || ''}</p>
          </div>
        </div>
        <div className="flex items-center justify-end">{props.actions || <></>}</div>
      </div>
      <div>{props.module || <></>}</div>
    </>
  );

  return (
    <div className="sticky top-0 z-10 bg-white">
      {props.fullWidth ? <div className="px-8">{content}</div> : <Container>{content}</Container>}
    </div>
  );
}
