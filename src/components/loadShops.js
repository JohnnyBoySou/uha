import { Column, Row } from "@theme/global";
import { Skeleton } from "moti/skeleton";

const LoadShops = () => {
    return (
        <Row style={{ backgroundColor: 'transparent', paddingHorizontal: 28, }}>
        <Column style={{ marginRight: 12, justifyContent: 'center', alignItems: 'center', }}>
            <Skeleton colorMode="light" radius={12} height={120} width={240} />
            <Column style={{ height: 6, }} />
            <Skeleton colorMode="light" radius={6} height={24} width={120} />
        </Column>
        <Column style={{ marginRight: 12, justifyContent: 'center', alignItems: 'center', }}>
            <Skeleton colorMode="light" radius={12} height={120} width={240} />
            <Column style={{ height: 6, }} />
            <Skeleton colorMode="light" radius={6} height={24} width={120} />
        </Column>
        </Row>
    )
}
export default LoadShops;