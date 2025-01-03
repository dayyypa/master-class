import { useQuery } from 'react-query';
import { getMovies, IGetMoviesResult } from 'src/api';
import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: black;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	padding: 60px;
	justify-content: center;
`;

const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	font-size: 25px;
	width: 50%;
`;

function Home() {
	const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
	console.log(data, isLoading);
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading ...</Loader>
			) : (
				<>
					<Banner>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
