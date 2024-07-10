import { Column, Row } from "@theme/global";
import { Skeleton } from "moti/skeleton";

const LoadServices = () => {
    return (
        <Row style={{ backgroundColor: 'transparent', paddingHorizontal: 28, paddingVertical: 18, }}>
            <Column style={{ marginRight: 12, }}>
                <Skeleton colorMode="light" radius={12} height={120} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={24} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={18} width={80} />
            </Column>
            <Column style={{ marginRight: 12, }}>
                <Skeleton colorMode="light" radius={12} height={120} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={24} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={18} width={80} />
            </Column>
            <Column style={{ marginRight: 12, }}>
                <Skeleton colorMode="light" radius={12} height={120} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={24} width={120} />
                <Column style={{ height: 6, }} />
                <Skeleton colorMode="light" radius={6} height={18} width={80} />
            </Column>
        </Row>
    )
}
export default LoadServices;