// eventData.js
export const tabConfigList = [
	{
		'name': 'Upcoming Events',
		'CSS': 'tab active',
		'dataId': 'Upcoming Events-1',
		'selected': true,
		'filter': {
			subscribed: false,
			started: false,
			finished: false
		},
	},
	{
		'name': 'My History',
		'CSS': 'tab',
		'dataId': 'My History-1',
		'selected': false,
		'filter': {
			subscribed: true,
			started: 'null',
			finished: 'null'
		},
	},
	{
		'name': 'Ongoing Event',
		'CSS': 'tab',
		'dataId': 'Ongoing Event-1',
		'selected': false,
		'filter': {
			subscribed: 'null',
			started: true,
			finished: false
		},
	},
	{
		'name': 'Expired Events',
		'CSS': 'tab',
		'dataId': 'Expired Events-1',
		'selected': false,
		'filter': {
			subscribed: 'null',
			started: 'null',
			finished: true
		},
	}
];

export const eventList = [
	{
		id: 1,
		name: "Tech Innovators Conference 2024",
		description: "Join us for the Tech Innovators Conference 2024, where leading technology companies and thought leaders converge to discuss the future of technology. Explore various topics including AI advancements, cybersecurity, and the latest in software development. Engage with industry experts through workshops and keynote sessions. Network with professionals and discover new opportunities. This event promises insightful sessions and valuable connections for all tech enthusiasts.",
		date: "2024-09-15",
		publisher: "Tech World Media",
		subscrptionEnabled: true,
		type: 'education',
		expectedAttendance: 500,
		subscribed: false,
		started: false,
		finished: false
	},
	{
		id: 2,
		name: "Health and Wellness Expo",
		description: "The Health and Wellness Expo brings together experts from the healthcare industry to share the latest advancements in health, wellness, and nutrition. Attend workshops on mental health, fitness routines, and dietary plans. Visit booths offering health screenings and wellness products. Meet with health professionals and learn about new treatments and technologies that can improve your quality of life. A must-attend event for anyone interested in maintaining a healthy lifestyle.",
		date: "2024-10-05",
		publisher: "HealthPlus",
		subscrptionEnabled: true,
		type: 'health',
		expectedAttendance: 300,
		subscribed: false,
		started: false,
		finished: false
	},
	{
		id: 3,
		name: "Art and Culture Festival",
		description: "Experience the Art and Culture Festival, a celebration of creativity and cultural heritage. This festival features a diverse array of art exhibitions, musical performances, and cultural showcases from around the world. Enjoy live music, theatrical performances, and art installations. Engage in interactive workshops and discover new artistic talents. The festival aims to promote cultural exchange and foster a deeper appreciation for the arts.",
		date: "2024-11-12",
		publisher: "ArtVibe Productions",
		subscrptionEnabled: true,
		type: 'culture',
		expectedAttendance: 400,
		subscribed: true,
		started: true,
		finished: true
	},
	{
		id: 4,
		name: "Startup Pitch Night",
		description: "Startup Pitch Night is an exciting event where emerging startups present their innovative ideas to a panel of investors and industry experts. Witness the next wave of entrepreneurial talent as they pitch their business concepts, demonstrate their products, and share their visions for the future. Network with founders, potential partners, and investors. This event provides a platform for startups to gain exposure and receive valuable feedback from experienced professionals.",
		date: "2024-12-02",
		publisher: "Entrepreneur Connect",
		subscrptionEnabled: true,
		type: 'business',
		expectedAttendance: 200,
		subscribed: true,
		started: true,
		finished: true
	},
	{
		id: 5,
		name: "Food and Beverage Expo",
		description: "The Food and Beverage Expo is a culinary extravaganza showcasing the latest trends in food and drink. Explore a wide variety of gourmet dishes, beverages, and culinary innovations from top chefs and food vendors. Participate in cooking demonstrations, tastings, and interactive sessions. Meet with industry professionals and learn about new products and techniques. This expo is perfect for food enthusiasts, chefs, and anyone interested in the culinary arts.",
		date: "2024-09-20",
		publisher: "Gourmet Events",
		subscrptionEnabled: false,
		type: 'food',
		expectedAttendance: 700,
		subscribed: true,
		started: true,
		finished: true
	},
	{
		id: 6,
		name: "Tech Innovators Conference 2024",
		description: "Join us for the Tech Innovators Conference 2024, where leading technology companies and thought leaders converge to discuss the future of technology. Explore various topics including AI advancements, cybersecurity, and the latest in software development. Engage with industry experts through workshops and keynote sessions. Network with professionals and discover new opportunities. This event promises insightful sessions and valuable connections for all tech enthusiasts.",
		date: "2024-09-15",
		publisher: "Tech World Media",
		subscrptionEnabled: true,
		type: 'education',
		expectedAttendance: 500,
		subscribed: false,
		started: true,
		finished: true
	},
	{
		id: 7,
		name: "Health and Wellness Expo",
		description: "The Health and Wellness Expo brings together experts from the healthcare industry to share the latest advancements in health, wellness, and nutrition. Attend workshops on mental health, fitness routines, and dietary plans. Visit booths offering health screenings and wellness products. Meet with health professionals and learn about new treatments and technologies that can improve your quality of life. A must-attend event for anyone interested in maintaining a healthy lifestyle.",
		date: "2024-10-05",
		publisher: "HealthPlus",
		subscrptionEnabled: true,
		type: 'health',
		expectedAttendance: 300,
		subscribed: false,
		started: true,
		finished: true
	},
	{
		id: 8,
		name: "Art and Culture Festival",
		description: "Experience the Art and Culture Festival, a celebration of creativity and cultural heritage. This festival features a diverse array of art exhibitions, musical performances, and cultural showcases from around the world. Enjoy live music, theatrical performances, and art installations. Engage in interactive workshops and discover new artistic talents. The festival aims to promote cultural exchange and foster a deeper appreciation for the arts.",
		date: "2024-11-12",
		publisher: "ArtVibe Productions",
		subscrptionEnabled: true,
		type: 'culture',
		expectedAttendance: 400,
		subscribed: false,
		started: true,
		finished: true
	},
	{
		id: 9,
		name: "Startup Pitch Night",
		description: "Startup Pitch Night is an exciting event where emerging startups present their innovative ideas to a panel of investors and industry experts. Witness the next wave of entrepreneurial talent as they pitch their business concepts, demonstrate their products, and share their visions for the future. Network with founders, potential partners, and investors. This event provides a platform for startups to gain exposure and receive valuable feedback from experienced professionals.",
		date: "2024-12-02",
		publisher: "Entrepreneur Connect",
		subscrptionEnabled: true,
		type: 'business',
		expectedAttendance: 200,
		subscribed: false,
		started: true,
		finished: true
	},
	{
		id: 10,
		name: "Food and Beverage Expo",
		description: "The Food and Beverage Expo is a culinary extravaganza showcasing the latest trends in food and drink. Explore a wide variety of gourmet dishes, beverages, and culinary innovations from top chefs and food vendors. Participate in cooking demonstrations, tastings, and interactive sessions. Meet with industry professionals and learn about new products and techniques. This expo is perfect for food enthusiasts, chefs, and anyone interested in the culinary arts.",
		date: "2024-09-20",
		publisher: "Gourmet Events",
		subscrptionEnabled: false,
		type: 'food',
		expectedAttendance: 700,
		subscribed: false,
		started: true,
		finished: true
	}
];