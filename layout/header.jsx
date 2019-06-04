import react from 'React';
import Link from 'next/link';
import Select from 'react-select';

export default class Header extends react.Component {
  render() {
    const { selectedOption, limitOptions, onLimitChange } = this.props;
    return (
      <header>
        <nav>
          <Link href="/"><a>Overview</a></Link>
          <Link href="/details"><a>Details</a></Link>
        </nav>
        <div className="select__wrapper">
          <Select
            value={selectedOption}
            onChange={onLimitChange}
            options={limitOptions}
          />
        </div>
        <style jsx>{`
          header {
            padding: 1em;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          nav > a {
            margin-right: 1em;
            font-size: 1.5em;
          }
          .select__wrapper {
            width: 250px;
          }
        `}</style>
      </header>
    )
  }
}
