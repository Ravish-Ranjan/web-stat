type searchParams = {
	page?: string;
	q?: string;
	sortBy?: string;
	sortOrder?: string;
};

interface TablePageProps {
	searchParamsPromise: Promise<searchParams>;
}

type WebsiteType = {
	name?: string;
	url: string;
	description?: string;
	createdAt: Date;
	id: string;
};
