import MatchTopHatstatsOverview from '../../rest/models/overview/MatchTopHatstatsOverview'
import { getSurprisingMatchesOverview } from '../../rest/Client'
import MatchesOverviewSection from './MatchesOverviewSection'
import { OverviewTableSectionProps } from './OverviewTableSection';
import LevelData from '../../rest/models/leveldata/LevelData';

class SurprisingMatchesOverviewSection<Data extends LevelData> extends MatchesOverviewSection<Data> {
    constructor(props: OverviewTableSectionProps<Data, MatchTopHatstatsOverview>) {
        super(props, 'overview.surprising_matches')
    }

    valueFormatter(value: number): JSX.Element {
        throw new Error("Method not implemented.");
    }

    loadOverviewEntity = getSurprisingMatchesOverview
}

export default SurprisingMatchesOverviewSection