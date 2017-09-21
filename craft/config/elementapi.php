<?php
namespace Craft;

return [
    'endpoints' => [
        'program.json' => [
            'elementType' => ElementType::Entry,
            'criteria' => ['section' => 'program'],
            'transformer' => function(EntryModel $entry) {

                //read time matrix
                $timeBlocks = [];
                foreach ($entry->time as $block) {
                    switch ($block->type->handle) {
                        case 'setTimes':
                            $timeBlocks[] = [
                                'type' => 'setTimes',
                                'start' => $block->start,
                                'duration' => $block->duration
                            ];
                            break;
                        case 'continuous':
                            $timeBlocks[] = [
                                'type' => 'continuous',
                                'start' => $block->start,
                                'end' => $block->end
                            ];
                            break;
                        case 'iterating':
                            $timeBlocks[] = [
                                'type' => 'iterating',
                                'start' => $block->start,
                                'end' => $block->end,
                                'frequency' => $block->frequency,
                                'duration' => $block->duration
                            ];
                            break;
                    }
                }

                //get descendants
                $events = $entry->getDescendants(2);
                $eventsInfo = [];

                foreach ($events as $event) {
                    $eventsInfo[] = [
                      'title' => $event->title,
                    ];
                }


                //return json structure
                return [
                    'title' => $entry->title,
                    'url' => $entry->url,
                    'jsonUrl' => UrlHelper::getUrl("program/{$entry->id}.json"),
                    'description' => (string)$entry->description,
                    'kindOfEvent' => array_map( function (CategoryModel $category) {
                        return [
                            'id' => $category->id,
                            'title' => $category->title
                        ];
                    }, $entry->kindOfEvent->find()),
                    'themes' => array_map( function (CategoryModel $category) {
                        return [
                            'id' => $category->id,
                            'title' => $category->title
                        ];
                    }, $entry->themes->find()),
                    'languages' => array_map( function (TagModel $tag) {
                        return [
                            'id' => $tag->id,
                            'title' => $tag->title
                        ];
                    }, $entry->languages->find()),
                    'time' => $timeBlocks,
                    'events' => $eventsInfo
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
                        'url' => $entry->url
                    ];
                },
            ];
        },

        'institution.json' => [
            'elementType' => ElementType::Entry,
            'criteria' => ['section' => 'program', 'type' =>'institution'],
            'transformer' => function(EntryModel $entry) {
                return [
                    'title' => $entry->title,
                    'id' => $entry->id,
                    'url' => $entry->url,
                    'jsonUrl' => UrlHelper::getUrl("institution/{$entry->id}.json")
                ];
            },
        ],
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
        'events.json' => [
            'elementType' => ElementType::Category,
            'criteria' => ['group' => 'kindOfEvent'],
            'transformer' => function(CategoryModel $entry) {
                return [
                    'title' => $entry->title,
                    'id' => $entry->id
                ];
            },
        ],
        'languages.json' => [
            'elementType' => ElementType::Tag,
            'criteria' => ['group' => 'languages'],
            'transformer' => function(TagModel $entry) {
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