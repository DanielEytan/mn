<?php
namespace Craft;

return [
    'endpoints' => [
        'program.json' => [
            'elementType' => ElementType::Entry,
            'criteria' => ['section' => 'program'],
            'transformer' => function(EntryModel $entry) {
                return [
                    'title' => $entry->title,
                    'url' => $entry->url,
                    'kindOfEvent' => $entry->kindOfEvent->title,
                    'jsonUrl' => UrlHelper::getUrl("program/{$entry->id}.json")
                ];
            },
        ],
        'program/<entryId:\d+>.json' => function($entryId) {
            return [
                'elementType' => ElementType::Entry,
                'criteria' => ['id' => $entryId],
                'first' => true,
                'transformer' => function(EntryModel $entry) {
                    return [
                        'title' => $entry->title,
                        'url' => $entry->url,
                    ];
                },
            ];
        },
        'themes.json' => [
            'elementType' => ElementType::Category,
            'criteria' => ['group' => 'themes'],
            'transformer' => function(CategoryModel $entry) {
                return [
                    'title' => $entry->title,
                    'id' => $entry->id
                ];
            },
        ],
        'locations.json' => [
			'elementType' => ElementType::Entry,
			// 'paginate' => false,
			'criteria' => [
				'section' => 'program',
				'type' => 'institution'
			],
			'transformer' => function(EntryModel $entry) {
				return [
					'title' => $entry->title,
					'lat' => $entry->map->lat,
					'lng' => $entry->map->lng,
				];
			},
		]
    ]
];