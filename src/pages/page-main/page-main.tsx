import { useState, useEffect} from 'react';
import NavigationItem from '../../components/ui/navigation-item/navigation-item';
import { AppRoute } from '../../components/const';
import Header from '../../components/header/header';
import { OfferType, Location, Nullable } from '../../types/offer-type';
import PlaceList from '../../components/place-list/place-list';
import { Cities } from '../../components/const';
import Map from '../../components/map/map';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { citySelection, loadOffers } from '../../store/actions';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import { SortTypes } from '../../components/const';

type PageMainProps = {
  offers: OfferType[];
}

const PageMain = ({ offers }: PageMainProps): JSX.Element => {
  const [activeCard, setActiveCard] = useState<Nullable<OfferType>>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadOffers(offers));
  }, [offers, dispatch]);

  const currentCity = useAppSelector((state) => state.title);
  const sortBy = useAppSelector((state) => state.sortBy);

  const getCurrentCityOffers = () => offers.filter((offer) => offer.city.name === currentCity);

  const getSortedCityOffers = () => {
    const currentCityOffers = getCurrentCityOffers();
    if (sortBy === SortTypes.HighToLow) {
      return currentCityOffers.sort((a: OfferType, b: OfferType) => b.price - a.price);
    }
    if (sortBy === SortTypes.LowToHigh) {
      return currentCityOffers.sort((a: OfferType, b: OfferType) => a.price - b.price);
    }
    if (sortBy === SortTypes.TopRatedFirst) {
      return currentCityOffers.sort((a: OfferType, b: OfferType) => b.rating - a.rating);
    }
    return currentCityOffers;
  };
  const sortedCityOffers = getSortedCityOffers();
  const centerLocation: Location = sortedCityOffers[0].city.location;
  const handlerMenuItem = (title: string) => {
    dispatch(citySelection(title));
  };
  return (
    <div className="page page--gray page--main">
      <Header isAuthorization />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.keys(Cities).map((city) => (
                <NavigationItem handlerLinkItem={handlerMenuItem}
                  title={city}
                  key={city}
                  path={AppRoute.Main}
                  currentCity={currentCity}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedCityOffers.length} places to stay in {currentCity}</b>
              <PlacesSorting />

              {/* <PlacesSorting getSortOffersList={getSortOffersList} /> */}
              <div className="cities__places-list places__list tabs__content">
                <PlaceList offers={sortedCityOffers} setActiveCard={setActiveCard} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" >
                <Map currentOffers={sortedCityOffers} center={centerLocation} activeCardId={activeCard?.id} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
};

export default PageMain;
